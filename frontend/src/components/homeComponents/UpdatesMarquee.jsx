import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import './UpdatesMarquee.css';
import updateService from '../../services/updateService'; // Import the service

const UpdatesMarquee = ({ speed = 120 }) => {
  const [updates, setUpdates] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);
  const animationFrameId = useRef(null);
  const position = useRef(0);

  const [currentPage, setCurrentPage] = useState(0); // 0-indexed
  const ITEMS_PER_PAGE = 3; // For mobile pagination

  const [lastAnnouncedUpdateId, setLastAnnouncedUpdateId] = useState(null);

  const announceNewUpdate = useCallback((newUpdate) => {
    const announceElement = document.getElementById('updatesAnnounce');
    if (announceElement && newUpdate && newUpdate._id !== lastAnnouncedUpdateId) { // Changed newUpdate.id to newUpdate._id
      const title = newUpdate.titleEn;
      announceElement.textContent = `New notice posted: ${title}`;
      setLastAnnouncedUpdateId(newUpdate._id); // Changed newUpdate.id to newUpdate._id
      // Clear content after a short delay to allow screen reader to announce
      setTimeout(() => { announceElement.textContent = ''; }, 1200);
    }
  }, [lastAnnouncedUpdateId]);

  const fetchUpdates = useCallback(async () => {
    try {
      const response = await updateService.getUpdates();
      const data = response.data;

      // Announce new updates (first new item)
      if (updates.length > 0 && data.length > updates.length) {
        const newItems = data.filter(newItem => !updates.some(oldItem => oldItem._id === newItem._id)); // Changed id to _id
        if (newItems.length > 0) {
          announceNewUpdate(newItems[0]);
        }
      } else if (updates.length === 0 && data.length > 0) {
        // Initial load: mark first as known so we don't announce initial load unnecessarily
        setLastAnnouncedUpdateId(data[0]._id); // Changed id to _id
      }

      setUpdates(data);
    } catch (error) {
      console.error("Failed to fetch updates:", error);
      setUpdates([]); // Show no updates if fetch fails
    }
  }, [announceNewUpdate]); // Removed 'updates' from dependency array

  useEffect(() => {
    // Initial fetch
    fetchUpdates();
    // Poll every 5 minutes
    const interval = setInterval(fetchUpdates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchUpdates]);

  const [isAnimating, setIsAnimating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = () => setReducedMotion(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  // Track mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    const onResize = () => {
      checkMobile();
      // Reset transform & position for new layout
      if (contentRef.current) {
        position.current = 0;
        contentRef.current.style.transform = 'translateX(0px)';
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Start/stop marquee animation using requestAnimationFrame
  const startMarquee = useCallback(() => {
    if (!marqueeRef.current || !contentRef.current || !isAnimating || updates.length === 0) return;

    const marqueeWidth = marqueeRef.current.offsetWidth;
    const contentWidth = contentRef.current.scrollWidth;

    // If content is narrower than container, center it and do nothing
    if (contentWidth <= marqueeWidth) {
      position.current = 0;
      contentRef.current.style.transform = `translateX(0px)`;
      return;
    }

    // If position is at default 0 or has been reset, start from marquee width (enter from right)
    if (position.current === 0 || position.current > marqueeWidth) {
      position.current = marqueeWidth;
    }

    let lastTimestamp = performance.now();

    const animate = (timestamp) => {
      if (!isAnimating) {
        cancelAnimationFrame(animationFrameId.current);
        return;
      }
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // speed px/sec -> px/ms
      const pxPerMs = speed / 1000;
      position.current -= pxPerMs * delta;

      // When completely scrolled out, reset to start
      if (position.current <= -contentWidth) {
        position.current = marqueeWidth;
      }

      // Apply transform
      if (contentRef.current) {
        contentRef.current.style.transform = `translateX(${position.current}px)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Kick off
    cancelAnimationFrame(animationFrameId.current);
    animationFrameId.current = requestAnimationFrame(animate);
  }, [isAnimating, updates.length, speed]);

  const stopMarquee = useCallback(() => {
    cancelAnimationFrame(animationFrameId.current);
  }, []);

  // Start/stop based on conditions (updates, mobile, reducedMotion, isAnimating)
  useEffect(() => {
    // If reduced motion or mobile view, do not animate — static list better
    if (reducedMotion || isMobile || updates.length === 0) {
      stopMarquee();
      // Ensure position reset
      if (contentRef.current) contentRef.current.style.transform = 'translateX(0px)';
      return;
    }

    if (isAnimating) {
      startMarquee();
    } else {
      stopMarquee();
    }

    return () => stopMarquee();
  }, [updates, isAnimating, startMarquee, stopMarquee, isMobile, reducedMotion]);

  const handlePlayPause = () => {
    setIsAnimating((prev) => !prev);
    setIsPaused((prev) => !prev);
    // If pausing, stop; if resuming, start
    if (isAnimating) {
      stopMarquee();
    } else {
      // restart (use effect will call startMarquee)
      // small timeout to allow layout reflow
      setTimeout(() => {
        if (!reducedMotion && !isMobile) startMarquee();
      }, 60);
    }
  };

  const handleStep = (direction) => {
    if (!contentRef.current || !marqueeRef.current) return;
    const stepSize = Math.max(160, Math.floor(marqueeRef.current.offsetWidth * 0.25)); // responsive step
    const contentWidth = contentRef.current.scrollWidth;
    if (direction === 'left') {
      position.current = Math.min(position.current + stepSize, 0);
    } else {
      position.current = Math.max(position.current - stepSize, -contentWidth + marqueeRef.current.offsetWidth);
    }
    contentRef.current.style.transform = `translateX(${position.current}px)`;
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopMarquee();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (isAnimating && !reducedMotion && !isMobile) startMarquee();
  };

  const handleFocus = () => {
    setIsPaused(true);
    stopMarquee();
  };

  const totalPages = Math.ceil(updates.length / ITEMS_PER_PAGE);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleBlur = () => {
    setIsPaused(false);
    if (isAnimating && !reducedMotion && !isMobile) startMarquee();
  };

  // If no updates, show fallback message
  if (updates.length === 0) {
    return (
      <div className="updates-marquee" role="region" aria-label="Latest updates">
        <p className="updates-empty">No updates at this time.</p>
      </div>
    );
  }

  return (
    <div
      className={`updates-marquee ${reducedMotion ? 'reduced-motion' : ''} ${isMobile ? 'mobile-view' : ''}`}
      role="region"
      aria-label="Latest updates"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0} // Make the marquee focusable for keyboard users
      ref={marqueeRef}
    >
      {/* Visually-hidden accessible list for screen readers */}
      <ul className="sr-only" aria-hidden={false}>
        {updates.slice(0, 5).map((update) => (
          <li key={update._id}>
            {update.titleEn}
          </li>
        ))}
      </ul>

      {/* Aria-live region for announcing new updates */}
      <div aria-live="polite" className="sr-only" id="updatesAnnounce" />

      {/* Desktop marquee (animated) */}
      {(!reducedMotion && !isMobile) && (
        <>
          <div className="marquee-viewport" aria-hidden={false}>
            <div className="marquee-content" ref={contentRef} role="list">
              {updates.map((update) => (
                <a
                  key={update.id}
                  href={update.link}
                  target={update.link.startsWith('/') ? '_self' : '_blank'}
                  rel={update.link.startsWith('/') ? '' : 'noopener noreferrer'}
                  className={`marquee-item ${update.severity}`}
                  role="listitem"
                  data-ga="marquee-item-click"
                  data-id={update._id}
                >
                  {update.severity !== 'info' && (
                    <span className={`severity-badge ${update.severity}`} aria-hidden="false">
                      {update.severity === 'urgent' ? 'Urgent' : 'Important'}
                    </span>
                  )}
                  <span className="item-title">
                    {update.titleEn}
                  </span>
                  {update.date && (
                    <span className="item-date" aria-hidden="true">
                      {' '}- {new Date(update.date).toLocaleDateString()}
                    </span>
                  )}
                </a>
              ))}
              {/* Duplicate the content once for smoother continuous scroll when JS-based animation reaches the end.
                  This duplication ensures there is content to scroll into while resetting position.
                  Only duplicate visually, not in the DOM for screen readers (aria-hidden). */}
              <div className="marquee-duplicate" aria-hidden="true">
                {updates.map((update) => (
                  <span key={`dup-${update._id}`} className={`marquee-item duplicate ${update.severity}`}>
                    {update.severity !== 'info' && (
                      <span className={`severity-badge ${update.severity}`} aria-hidden="true">
                        {update.severity === 'urgent' ? 'Urgent' : 'Important'}
                      </span>
                    )}
                    <span className="item-title">
                      {update.titleEn}
                    </span>
                    {update.date && (
                      <span className="item-date" aria-hidden="true">
                        {' '}- {new Date(update.date).toLocaleDateString()}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="marquee-controls" aria-hidden={false}>
            <button
              onClick={() => handleStep('left')}
              aria-label="Step left"
              className="control-button"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handlePlayPause}
              aria-label={isAnimating ? 'Pause updates' : 'Play updates'}
              aria-pressed={!isAnimating}
              className="control-button"
            >
              {isAnimating ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={() => handleStep('right')}
              aria-label="Step right"
              className="control-button"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}

      {/* Mobile or reduced-motion view: stacked list */}
      {(reducedMotion || isMobile) && (
        <>
          <div className="static-updates-list" aria-hidden={false}>
            {updates.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE).map((update) => (
              <a
                key={update._id}
                href={update.link}
                target={update.link.startsWith('/') ? '_self' : '_blank'}
                rel={update.link.startsWith('/') ? '' : 'noopener noreferrer'}
                className={`marquee-item ${update.severity}`}
                data-ga="marquee-item-click"
                data-id={update._id}
              >
                {update.severity !== 'info' && (
                  <span className={`severity-badge ${update.severity}`} aria-hidden="true">
                    {update.severity === 'urgent' ? 'Urgent' : 'Important'}
                  </span>
                )}
                <span className="item-title">
                  {update.titleEn}
                </span>
                {update.date && (
                  <span className="item-date" aria-hidden="true">
                    {' '}- {new Date(update.date).toLocaleDateString()}
                  </span>
                )}
              </a>
            ))}
          </div>
          {totalPages > 1 && ( // Only show controls if more than one page
            <div className="pagination-controls">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className="pagination-button"
                aria-label="Previous page"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="pagination-button"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UpdatesMarquee;

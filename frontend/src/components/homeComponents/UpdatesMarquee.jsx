import React, { useState, useEffect, useRef, useCallback } from 'react';
import './UpdatesMarquee.css';

const UpdatesMarquee = ({ speed = 60, lang = 'en' }) => {
  const [updates, setUpdates] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);
  const animationFrameId = useRef(null);
  const position = useRef(0);

  const [lastAnnouncedUpdateId, setLastAnnouncedUpdateId] = useState(null);

  const announceNewUpdate = useCallback((newUpdate) => {
    const announceElement = document.getElementById('updatesAnnounce');
    if (announceElement && newUpdate && newUpdate.id !== lastAnnouncedUpdateId) {
      const title = lang === 'en' ? newUpdate.titleEn : newUpdate.titleHi;
      announceElement.textContent = `New notice posted: ${title}`;
      setLastAnnouncedUpdateId(newUpdate.id);
      // Clear content after a short delay to allow screen reader to announce
      setTimeout(() => { announceElement.textContent = ''; }, 1000);
    }
  }, [lang, lastAnnouncedUpdateId]);

  const fetchUpdates = useCallback(async () => {
    const CACHE_KEY = 'updatesMarqueeCache';
    const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

    const getCachedUpdates = () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            return data;
          }
        }
      } catch (e) {
        console.error("Error reading from localStorage:", e);
      }
      return null;
    };

    const setCachedUpdates = (data) => {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
      } catch (e) {
        console.error("Error writing to localStorage:", e);
      }
    };

    try {
      const response = await fetch('/data/updates.json'); // Assuming public/data/updates.json
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Check for new updates and announce
      if (updates.length > 0 && data.length > updates.length) {
        const newItems = data.filter(newItem => !updates.some(oldItem => oldItem.id === newItem.id));
        if (newItems.length > 0) {
          announceNewUpdate(newItems[0]); // Announce the first new item
        }
      } else if (updates.length === 0 && data.length > 0) {
        // Initial load with updates, set the last announced ID
        setLastAnnouncedUpdateId(data[0].id);
      }

      setUpdates(data);
      setCachedUpdates(data);
    } catch (error) {
      console.error("Failed to fetch updates:", error);
      const cachedData = getCachedUpdates();
      if (cachedData) {
        setUpdates(cachedData);
        console.log("Using cached updates due to fetch error.");
      } else {
        setUpdates([]); // Show no updates if fetch fails and no cache
      }
    }
  }, [updates, lang, announceNewUpdate]); // Added updates, lang, announceNewUpdate to dependencies

  useEffect(() => {
    // Initial fetch
    fetchUpdates();
    // Poll every 5 minutes
    const interval = setInterval(fetchUpdates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchUpdates]);

  const [isAnimating, setIsAnimating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const startMarquee = useCallback(() => {
    if (!marqueeRef.current || !contentRef.current || !isAnimating || updates.length === 0) return;

    const marqueeWidth = marqueeRef.current.offsetWidth;
    const contentWidth = contentRef.current.scrollWidth;

    const animate = () => {
      if (!isAnimating) {
        cancelAnimationFrame(animationFrameId.current);
        return;
      }

      position.current -= speed / 60; // speed in pixels per second, 60 frames per second

      if (position.current <= -contentWidth) {
        position.current = marqueeWidth; // Reset to start from right
      }

      contentRef.current.style.transform = `translateX(${position.current}px)`;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
  }, [speed, isAnimating, updates.length]);

  const stopMarquee = useCallback(() => {
    cancelAnimationFrame(animationFrameId.current);
  }, []);

  useEffect(() => {
    if (updates.length > 0 && isAnimating) {
      startMarquee();
    } else {
      stopMarquee();
    }
    return () => stopMarquee();
  }, [updates, isAnimating, startMarquee, stopMarquee]);

  const handlePlayPause = () => {
    setIsAnimating(prev => !prev);
    setIsPaused(prev => !prev); // Keep isPaused in sync for hover/focus logic
  };

  const handleStep = (direction) => {
    if (!contentRef.current) return;
    const stepSize = 200; // Pixels to step
    if (direction === 'left') {
      position.current = Math.min(0, position.current + stepSize);
    } else {
      position.current = Math.max(-contentRef.current.scrollWidth + marqueeRef.current.offsetWidth, position.current - stepSize);
    }
    contentRef.current.style.transform = `translateX(${position.current}px)`;
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopMarquee();
  };

  const handleMouseLeave = () => {
    if (isAnimating) { // Only resume if it was animating before hover
      setIsPaused(false);
      startMarquee();
    }
  };

  const handleFocus = () => {
    setIsPaused(true);
    stopMarquee();
  };

  const handleBlur = () => {
    if (isAnimating) { // Only resume if it was animating before focus
      setIsPaused(false);
      startMarquee();
    }
  };

  // Check for prefers-reduced-motion and mobile viewport
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming 768px as mobile breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (updates.length === 0) {
    return (
      <div className="updates-marquee" role="region" aria-label="Latest updates">
        <p>No updates at this time.</p>
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
      tabIndex="0" // Make the marquee focusable
      ref={marqueeRef}
    >
      {/* Visually hidden accessible list for screen readers */}
      <ul className="sr-only" aria-hidden={false}>
        {updates.slice(0, 5).map((update) => (
          <li key={update.id} lang={lang}>
            {lang === 'en' ? update.titleEn : update.titleHi}
          </li>
        ))}
      </ul>

      {/* Aria-live region for announcements (initially empty) */}
      <div aria-live="polite" className="sr-only" id="updatesAnnounce" />

      {(!reducedMotion && !isMobile) && (
        <>
          <div className="marquee-content" ref={contentRef}>
            {updates.map((update) => (
              <a
                key={update.id}
                href={update.link}
                target={update.link.startsWith('/') ? '_self' : '_blank'}
                rel={update.link.startsWith('/') ? '' : 'noopener noreferrer'}
                className={`marquee-item ${update.severity}`}
                data-ga="marquee-item-click"
                data-id={update.id}
              >
                {update.severity !== 'info' && (
                  <span className={`severity-badge ${update.severity}`} aria-label={update.severity}>
                    {update.severity === 'urgent' ? 'Urgent' : 'Important'}
                  </span>
                )}
                <span className="item-title">
                  {lang === 'en' ? update.titleEn : update.titleHi}
                </span>
                {update.date && (
                  <span className="item-date">
                    {' '}- {new Date(update.date).toLocaleDateString()}
                  </span>
                )}
              </a>
            ))}
          </div>
          <div className="marquee-controls">
            <button
              onClick={() => handleStep('left')}
              aria-label="Step left"
              className="control-button"
            >
              &lt;
            </button>
            <button
              onClick={handlePlayPause}
              aria-label={isAnimating ? 'Pause updates' : 'Play updates'}
              aria-pressed={!isAnimating}
              className="control-button"
            >
              {isAnimating ? '❚❚' : '▶'}
            </button>
            <button
              onClick={() => handleStep('right')}
              aria-label="Step right"
              className="control-button"
            >
              &gt;
            </button>
          </div>
        </>
      )}

      {(reducedMotion || isMobile) && (
        <div className="static-updates-list">
          {updates.map((update) => (
            <a
              key={update.id}
              href={update.link}
              target={update.link.startsWith('/') ? '_self' : '_blank'}
              rel={update.link.startsWith('/') ? '' : 'noopener noreferrer'}
              className={`marquee-item ${update.severity}`}
              data-ga="marquee-item-click"
              data-id={update.id}
            >
              {update.severity !== 'info' && (
                <span className={`severity-badge ${update.severity}`} aria-label={update.severity}>
                  {update.severity === 'urgent' ? 'Urgent' : 'Important'}
                </span>
              )}
              <span className="item-title">
                {lang === 'en' ? update.titleEn : update.titleHi}
              </span>
              {update.date && (
                <span className="item-date">
                  {' '}- {new Date(update.date).toLocaleDateString()}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdatesMarquee;

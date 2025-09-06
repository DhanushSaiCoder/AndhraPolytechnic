import React, { useState, useEffect, useCallback } from "react";
import styles from "./Hero.module.css";
import { GraduationCap } from "lucide-react";

const Hero = ({
  slides,
  defaultLanguage = "en",
  autoplay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoplay && !isPaused && !isReducedMotion) {
      const slideInterval = setInterval(goToNext, interval);
      return () => clearInterval(slideInterval);
    }
  }, [currentIndex, autoplay, isPaused, isReducedMotion, interval, goToNext]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    },
    [goToNext, goToPrevious]
  );

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === 0) return;
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      // Threshold
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
      setTouchStartX(0); // Reset
    }
  };

  return (
    <header
      className={styles.hero}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      role="region"
      aria-roledescription="carousel"
      aria-label="Announcements"
      tabIndex={0}               // allow focus for keyboard listeners
      onKeyDown={handleKeyDown}  // keyboard navigation on focused hero
    >
      <div className={styles.slidesContainer} aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ""}`}
            aria-hidden={index !== currentIndex}
          >
            <picture>
              {slide.imageWebp && (
                <source
                  srcSet={slide.imageWebp}
                  type="image/webp"
                  sizes="(max-width: 480px) 100vw, (max-width: 1024px) 90vw, 1200px"
                />
              )}
              <img
                srcSet={`${slide.image} 1x, ${slide.image2x} 2x`}
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 90vw, 1200px"
                className={styles.slideImg}
              />
            </picture>
            <div className={styles.overlay}></div>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.badge} aria-hidden="true">
          <GraduationCap className={styles.badgeIcon} />
          <span className={styles.badgeText}>Excellence in Polytechnic Education</span>
        </div>

        {/* Title with non-wrapping institution name to prevent awkward breaks */}
        <h1 className={styles.title}>
          Welcome to <span className={styles.noWrap}>Andhra Polytechnic</span>
        </h1>

        <p className={styles.subtitle}>
          A Premier Institution for Technical Education and Innovation.
        </p>

        <div className={styles.ctaRow}>
          <a href="/apply" className={styles.cta} aria-label="Apply Now">
            Apply Now
          </a>
          <a href="/programs" className={styles.secondaryCta} aria-label="View Programs">
            Programs
          </a>
        </div>
      </div>

      {/* Controls: arrows moved to left/right sides */}
      <div className={styles.controls} aria-hidden={false}>
        <button
          onClick={goToPrevious}
          className={styles.prevButton}
          aria-label="Previous Slide"
          title="Previous"
        >
          <span aria-hidden="true">&#10094;</span>
        </button>
        <button
          onClick={goToNext}
          className={styles.nextButton}
          aria-label="Next Slide"
          title="Next"
        >
          <span aria-hidden="true">&#10095;</span>
        </button>
      </div>

      {/* Dots centered below */}
      <div className={styles.dots} role="tablist" aria-label="Slide navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>

      <div aria-live="polite" className={styles.visuallyHidden}>
        {`Slide ${currentIndex + 1}`}
      </div>
    </header>
  );
};

export default Hero;

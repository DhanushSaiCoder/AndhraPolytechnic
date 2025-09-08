import React, { useState, useEffect } from 'react';
import ControlledImageSlider from '../HomeComponents/ControlledImageSlider';
import { eventsData } from '../../data/eventsData';
import '../../styles/EventsStyles/EventsPage.css';

const SportsEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slides = eventsData.sports;

  useEffect(() => {
    if (!isAutoPlaying || !slides || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides]);

  const nextSlide = () => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide(index);
  };

  const activeSlide = slides[currentSlide];

  return (
    <section className="event-category-section sports-events">
        <h2 className="event-category-title">Sports</h2>
        <div className="event-layout-split">
            <div className="event-slider-container">
                <ControlledImageSlider
                    slides={slides}
                    currentSlide={currentSlide}
                    onNext={nextSlide}
                    onPrev={prevSlide}
                    onGoTo={goToSlide}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                />
            </div>
            <div className="event-details">
                <h3 className="event-title">{activeSlide.title}</h3>
                <p className="event-subtitle">{activeSlide.subtitle}</p>
            </div>
        </div>
    </section>
  );
};

export default SportsEvents;
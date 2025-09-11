import React, { useState, useEffect } from 'react';
import ControlledImageSlider from '../HomeComponents/ControlledImageSlider';
import eventService from '../../services/eventService';
import '../../styles/EventsStyles/EventsPage.css';
import { MoreHorizontal } from 'lucide-react';
import { getOptimizedImageUrl } from '../../utils/cloudinaryUtils';

const OtherEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getEvents();
        const otherEvents = response.data.filter(event => event.category === 'other');
        const formattedSlides = otherEvents.map(slide => ({
          ...slide,
          id: slide._id,
          image: getOptimizedImageUrl(slide.image, { w: 1200, h: 800 })
        }));
        setSlides(formattedSlides);
      } catch (error) {
        console.error('Error fetching other events:', error);
      }
    };
    fetchEvents();
  }, []);

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

  if (!activeSlide) {
    return null; // Or some loader
  }

  return (
    <section className="event-category-section other-events">
        <div className="event-category-header">
            <div className="event-category-heading">
                <MoreHorizontal className="event-category-icon" />
                <h2 className="event-category-title">Other Events</h2>
            </div>
            <p className="event-category-subtitle">Discover graduation ceremonies, drives, and more.</p>
        </div>
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

export default OtherEvents;
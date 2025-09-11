import React, { useState, useEffect } from 'react';
import ControlledImageSlider from './ControlledImageSlider';
import '../../styles/HomeStyles/ImageSlider.css';

const ImageSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  if (!slides || slides.length === 0) {
    return <div>No slides to display.</div>;
  }

  return (
    <div className="image-slider-container" style={{ position: 'relative' }}>
      <ControlledImageSlider
        slides={slides}
        currentSlide={currentSlide}
        onNext={nextSlide}
        onPrev={prevSlide}
        onGoTo={goToSlide}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div className="text-overlay">
        <h3 className="slide-title">{slides[currentSlide].title}</h3>
        <p className="slide-subtitle">{slides[currentSlide].subtitle}</p>
      </div>
    </div>
  );
};

export default ImageSlider;
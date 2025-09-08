import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SliderCard from './SliderCard';
import '../../styles/HomeStyles/ControlledImageSlider.css';

const ControlledImageSlider = ({
  slides,
  currentSlide,
  onNext,
  onPrev,
  onGoTo,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!slides || slides.length === 0) {
    return <div>No slides to display.</div>;
  }

  return (
    <div
      className="slider"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : index < currentSlide ? 'left' : 'right'}`}
          >
            <SliderCard image={slide.image} />
          </div>
        ))}
        <button onClick={onPrev} className="arrow left" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button onClick={onNext} className="arrow right" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            className={`dot ${index === currentSlide ? 'active-dot' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ControlledImageSlider;

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SliderCard from "./SliderCard";
import "../../styles/HomeStyles/ImageSlider.css"; // Adjust the path as necessary

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

  if (!slides || slides.length === 0) {
    return <div>No slides to display.</div>;
  }

  return (
    <div 
      className="slider"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? "active" : index < currentSlide ? "left" : "right"}`}
          >
            <SliderCard image={slide.image} title={slide.title} subtitle={slide.subtitle} />
          </div>
        ))}
        <button onClick={prevSlide} className="arrow left" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="arrow right" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>
        <div className="text-overlay">
          <h3 className="slide-title">{slides[currentSlide].title}</h3>
          <p className="slide-subtitle">{slides[currentSlide].subtitle}</p>
        </div>
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot ${index === currentSlide ? "active-dot" : ""}`}
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

export default ImageSlider;
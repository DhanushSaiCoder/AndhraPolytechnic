import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SliderCard from "./SliderCard";
import "../../styles/HomeStyles/ImageSlider.css"; // Adjust the path as necessary

const slides = [
  { id: 1, image: "https://picsum.photos/1200/600?random=1", title: "Main Academic Block", subtitle: "Historic architecture housing modern education since 1952" },
  { id: 2, image: "https://picsum.photos/1200/600?random=2", title: "Innovation Laboratory", subtitle: "State-of-the-art equipment for hands-on technical learning" },
  { id: 3, image: "https://picsum.photos/1200/600?random=3", title: "Central Library", subtitle: "Extensive collection of technical books and digital resources" },
  { id: 4, image: "https://picsum.photos/1200/600?random=4", title: "Campus Grounds", subtitle: "Spacious green campus promoting student well-being" },
  { id: 5, image: "https://picsum.photos/1200/600?random=5", title: "Cultural Activities", subtitle: "Vibrant student life with festivals and competitions" },
  { id: 6, image: "https://picsum.photos/1200/600?random=6", title: "Engineering Workshop", subtitle: "Advanced machinery for practical engineering experience" }
];

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

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
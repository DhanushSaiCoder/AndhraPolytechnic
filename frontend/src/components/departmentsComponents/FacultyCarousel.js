import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FacultyCard from './FacultyCard';
import './FacultyCard.css';
import '../../styles/DepartmentsStyles/FacultyCarousel.css';

const FacultyCarousel = ({ faculty }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -75) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % faculty.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + faculty.length) % faculty.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [faculty.length]);

  useEffect(() => {
    if (carouselRef.current) {
      const cardElement = carouselRef.current.children[currentIndex];
      if (cardElement) {
        const scrollAmount =
          cardElement.offsetLeft - (carouselRef.current.offsetWidth - cardElement.offsetWidth) / 2;
        carouselRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  }, [currentIndex]);

  if (!faculty || faculty.length === 0) {
    return <p className="no-faculty-message">No faculty profiles available for this department.</p>;
  }

  return (
    <div className="faculty-carousel-container" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <button className="carousel-arrow left" onClick={prevSlide} aria-label="Previous Faculty Member">
        <FaChevronLeft />
      </button>
      <div className="faculty-carousel-track" ref={carouselRef}>
        {faculty.map((member, index) => (
          <FacultyCard
            key={member.id || index}
            name={member.name}
            designation={member.designation}
            specialization={member.specialization}
            imageUrl={member.imageUrl}
            socials={member.socials}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <button className="carousel-arrow right" onClick={nextSlide} aria-label="Next Faculty Member">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default FacultyCarousel;

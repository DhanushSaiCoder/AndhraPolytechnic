import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';
import '../../styles/DepartmentsStyles/FacultyCarousel.css';

const FacultyCarousel = ({ faculty }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const socialIcons = {
    linkedin: <FaLinkedin />,
    email: <FaEnvelope />,
    twitter: <FaTwitter />,
  };

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
    const interval = setInterval(nextSlide, 5000); // Auto-scroll every 5 seconds
    return () => clearInterval(interval);
  }, [faculty.length]);

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth;
      const scrollAmount = currentIndex * cardWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
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
          <div key={index} className={`faculty-card ${index === currentIndex ? 'active' : ''}`}>
            <div className="faculty-card-background"></div>
            <img src={member.imageUrl} alt={member.name} className="faculty-image" />
            <div className="faculty-details">
              <h4 className="faculty-name">{member.name}</h4>
              <p className="faculty-designation">{member.designation}</p>
              <p className="faculty-specialization">{member.specialization}</p>
              {member.socials && (
                <div className="faculty-socials">
                  {member.socials.map((social, i) => (
                    <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.type}>
                      {socialIcons[social.type]}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-arrow right" onClick={nextSlide} aria-label="Next Faculty Member">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default FacultyCarousel;

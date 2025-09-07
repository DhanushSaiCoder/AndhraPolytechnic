import React, { useState, useEffect, useRef } from 'react';
import '../../styles/DepartmentsStyles/FacultyCarousel.css';

const FacultyCarousel = ({ faculty }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % faculty.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [faculty.length]);

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].offsetWidth;
      carouselRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  if (!faculty || faculty.length === 0) {
    return <p>No faculty profiles available.</p>;
  }

  return (
    <div className="faculty-carousel-container">
      <div className="faculty-carousel-track" ref={carouselRef}>
        {faculty.map((member, index) => (
          <div
            key={index}
            className="faculty-card"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            <div className="faculty-image-wrapper">
              <img src={member.imageUrl} alt={member.name} className="faculty-image" />
            </div>
            <div className="faculty-details">
              <h4 className="faculty-name">{member.name}</h4>
              <p className="faculty-designation">{member.designation}</p>
              <p className="faculty-specialization">{member.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyCarousel;

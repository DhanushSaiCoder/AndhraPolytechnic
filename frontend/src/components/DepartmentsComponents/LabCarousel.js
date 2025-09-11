import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import { Maximize } from 'lucide-react'; // Import Maximize icon
import ImageModal from '../ImageModal'; // Import ImageModal
import ImageLoader from '../ImageLoader/ImageLoader'; // Import ImageLoader
import { getOptimizedImageUrl } from '../../utils/cloudinaryUtils';
import '../../styles/DepartmentsStyles/LabCarousel.css';

const LabCarousel = ({ labs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image URL
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % labs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + labs.length) % labs.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-play
    return () => clearInterval(interval);
  }, [labs.length]);

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

  const handleExpandClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  if (!labs || labs.length === 0) {
    return <p className="no-labs-message">No labs to display for this department.</p>;
  }

  return (
    <div className="lab-carousel-container" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <button className="carousel-arrow left" onClick={prevSlide} aria-label="Previous Lab">
        <FaChevronLeft />
      </button>
      <div className="lab-carousel-track" ref={carouselRef}>
        {labs.map((lab, index) => (
          <div key={index} className={`lab-card ${index === currentIndex ? 'active' : ''}`}>
            <div className="lab-card__image-wrap">
              <ImageLoader src={getOptimizedImageUrl(lab.imageUrl, { w: 300, h: 200 })} alt={lab.name} className="lab-card__image" />
              <button
                className="lab-card__expand-button"
                aria-label="Expand Image"
                onClick={() => handleExpandClick(getOptimizedImageUrl(lab.imageUrl, { w: 1200, h: 800 }))} // Add onClick handler
              >
                <Maximize size={20} />
              </button>
            </div>
            <div className="lab-card__content">
              <h3>{lab.name}</h3>
              <p>{lab.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-arrow right" onClick={nextSlide} aria-label="Next Lab">
        <FaChevronRight />
      </button>

      {isModalOpen && (
        <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default LabCarousel;
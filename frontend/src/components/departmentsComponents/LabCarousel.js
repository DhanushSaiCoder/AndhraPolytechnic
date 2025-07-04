
import React, { useState } from 'react';
import '../../styles/DepartmentsStyles/LabCarousel.css'; // Adjust the path as necessary

const LabCarousel = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (e, image) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openLightbox(image);
    }
  };

  return (
    <>
      <div className="lab-carousel">
        {images.map((image, index) => (
          <div 
            key={index}
            className="lab-image-card"
            onClick={() => openLightbox(image)}
            role="button"
            tabIndex={0}
            aria-label={`View ${image.alt} in full size`}
            onKeyDown={(e) => handleKeyDown(e, image)}
          >
            <div className="image-container">
              <img
                src={image.src}
                alt={image.alt}
                className="lab-image"
                loading="lazy"
              />
              <div className="image-overlay"></div>
              <div className="image-caption">
                <p className="caption-text">{image.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div className="lightbox-content">
            <button
              onClick={closeLightbox}
              className="lightbox-close"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="lightbox-image"
            />
            <div className="lightbox-info">
              <h3 id="lightbox-title" className="lightbox-title">
                {selectedImage.alt}
              </h3>
              <p className="lightbox-description">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LabCarousel;

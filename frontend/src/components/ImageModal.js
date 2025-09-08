import React, { useState } from 'react';
import { X } from 'lucide-react'; // Close icon
import '../styles/ImageModal.css'; // New CSS file

const ImageModal = ({ imageUrl, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!imageUrl) return null;

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <button className="image-modal-close" onClick={onClose}>
        <X size={24} />
      </button>
      <div className={`image-modal-content ${isLoading ? 'loading' : ''}`} onClick={(e) => e.stopPropagation()}>
        {isLoading && <div className="image-modal-spinner"></div>}
        {hasError && !isLoading && <p className="image-modal-message">Failed to load image.</p>}
        <img
          src={imageUrl}
          alt="Expanded View"
          className={`image-modal-image ${isLoading || hasError ? 'hidden' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default ImageModal;

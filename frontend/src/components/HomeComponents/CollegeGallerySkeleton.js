import React from 'react';
import '../../styles/HomeStyles/CollegeGallery.css';

const CollegeGallerySkeleton = () => {
  return (
    <div className="campus-gallery">
      <div className="container">
        <div className="header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </div>
        <div className="skeleton skeleton-slider"></div>
      </div>
    </div>
  );
};

export default CollegeGallerySkeleton;

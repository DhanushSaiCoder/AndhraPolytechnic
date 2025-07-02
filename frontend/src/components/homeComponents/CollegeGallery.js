import React from 'react';
import ImageSlider from './ImageSlider';
import '../../styles/HomeStyles/CollegeGallery.css'; // Adjust the path as necessary

const CollegeGallery = () => {
  return (
    <div className="campus-gallery">
      <div className="container">
        <div className="header">
          <h2 className="title">Campus Gallery</h2>
          <p className="subtitle">
            Discover our learning spaces and student activities
          </p>
        </div>
        <ImageSlider />
      </div>
    </div>
  );
};

export default CollegeGallery;

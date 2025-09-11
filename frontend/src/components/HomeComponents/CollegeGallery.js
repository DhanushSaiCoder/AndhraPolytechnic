import React, { useState, useEffect } from 'react';
import ImageSlider from './ImageSlider';
import '../../styles/HomeStyles/CollegeGallery.css'; // Adjust the path as necessary
import galleryService from '../../services/galleryService'; // Import galleryService
import { getOptimizedImageUrl } from '../../utils/cloudinaryUtils';
import CollegeGallerySkeleton from './CollegeGallerySkeleton';

const CollegeGallery = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await galleryService.getGallerySlides();
        // Map _id to id for ImageSlider component if it expects 'id'
        const formattedSlides = response.data.map(slide => ({
          ...slide,
          id: slide._id, // Ensure 'id' is present for ImageSlider
          image: getOptimizedImageUrl(slide.image, { w: 1200, h: 800 })
        }));
        console.log('Fetched slides:', formattedSlides);  
        setSlides(formattedSlides);

      } catch (error) {
        console.error('Error fetching gallery slides:', error);

        setSlides([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return <CollegeGallerySkeleton />;
  }

  return (
    <div className="campus-gallery">
      <div className="container">
        <div className="header">
          <h2 className="title" >Campus Gallery</h2>
          <p className="subtitle">
            Discover our learning spaces and student activities
          </p>
        </div>
        <ImageSlider slides={slides}  />

      </div>
    </div>
  );
};

export default CollegeGallery;

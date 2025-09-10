import React, { useState, useEffect } from 'react';
import galleryService from '../../../services/galleryService'; // Import the service
import CollegeGalleryModal from './CollegeGalleryModal'; // Import the new modal

const CollegeGalleryEditor = () => {
  const [slides, setSlides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);

  const fetchSlides = async () => {
    try {
      const response = await galleryService.getGallerySlides();
      setSlides(response.data);
    } catch (error) {
      console.error('Error fetching gallery slides:', error);
      alert('Failed to fetch gallery slides.');
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleAddClick = () => {
    setEditingSlide({ _id: '', image: '', title: '', subtitle: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (slide) => {
    setEditingSlide(slide);
    setIsModalOpen(true);
  };

  const handleSaveSlide = async (slideData) => {
    try {
      if (slideData._id) {
        await galleryService.updateGallerySlide(slideData._id, slideData);
        alert('Slide updated successfully!');
      } else {
        await galleryService.createGallerySlide(slideData);
        alert('Slide added successfully!');
      }
      fetchSlides(); // Re-fetch slides
      setIsModalOpen(false);
      setEditingSlide(null);
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Failed to save slide.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      try {
        await galleryService.deleteGallerySlide(id);
        alert('Slide deleted successfully!');
        fetchSlides();
      } catch (error) {
        console.error('Error deleting slide:', error);
        alert('Failed to delete slide.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>College Gallery Content</h3>

      <div className="form-actions">
        <button onClick={handleAddClick} className="save-btn">Add New Slide</button>
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Gallery Slides</h4>
      <ul className="admin-list">
        {slides.map(slide => (
          <li key={slide._id} className="admin-list-item">
            <span>{slide.title}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditClick(slide)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(slide._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingSlide && (
        <CollegeGalleryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSlide}
          slide={editingSlide}
        />
      )}
    </section>
  );
};

export default CollegeGalleryEditor;

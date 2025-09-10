import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import galleryService from '../../../services/galleryService';
import CollegeGalleryModal from './CollegeGalleryModal';
import Loader from '../../Loader';

const CollegeGalleryEditor = () => {
  const [slides, setSlides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSlides = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await galleryService.getGallerySlides();
      setSlides(response.data);
    } catch (error) {
      console.error('Error fetching gallery slides:', error);
      alert('Failed to fetch gallery slides.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

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
      fetchSlides();
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

  if (isLoading) {
    return <Loader text="Loading Gallery..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>College Gallery Content</h3>
        <button onClick={handleAddClick} className="btn btn-primary">Add New Slide</button>
      </div>

      <ul className="admin-simple-list">
        {slides.map(slide => (
          <li key={slide._id} className="admin-simple-list-item">
            <span>{slide.title}</span>
            <div className="admin-list-item-actions">
              <button onClick={() => handleEditClick(slide)} className="btn-icon" title="Edit"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(slide._id)} className="btn-icon btn-danger" title="Delete"><Trash2 size={18} /></button>
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

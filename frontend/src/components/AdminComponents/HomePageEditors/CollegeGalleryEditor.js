import React, { useState, useEffect } from 'react';
import galleryService from '../../../services/galleryService'; // Import the service

const CollegeGalleryEditor = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState({
    _id: '', // Changed to _id
    image: '',
    title: '',
    subtitle: '',
  });
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSlide(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddSlide = async () => {
    if (currentSlide.image.trim() === '' || currentSlide.title.trim() === '') return;
    try {
      if (editingId) {
        await galleryService.updateGallerySlide(editingId, currentSlide);
        alert('Slide updated successfully!');
      } else {
        await galleryService.createGallerySlide(currentSlide);
        alert('Slide added successfully!');
      }
      fetchSlides(); // Re-fetch slides
      setCurrentSlide({ _id: '', image: '', title: '', subtitle: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Failed to save slide.');
    }
  };

  const handleEdit = (slide) => {
    setCurrentSlide(slide);
    setEditingId(slide._id);
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

      <div className="form-group">
        <label htmlFor="slideImage">Image URL</label>
        <input type="text" id="slideImage" name="image" value={currentSlide.image} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="slideTitle">Title</label>
        <input type="text" id="slideTitle" name="title" value={currentSlide.title} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="slideSubtitle">Subtitle</label>
        <textarea id="slideSubtitle" name="subtitle" value={currentSlide.subtitle} onChange={handleChange}></textarea>
      </div>
      <div className="form-actions">
        <button onClick={handleAddSlide} className="save-btn">{editingId ? 'Save Changes' : 'Add Slide'}</button>
        {editingId && <button onClick={() => {setEditingId(null); setCurrentSlide({ id: '', image: '', title: '', subtitle: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Gallery Slides</h4>
      <ul className="admin-list">
        {slides.map(slide => (
          <li key={slide._id} className="admin-list-item">
            <span>{slide.title}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(slide)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(slide._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CollegeGalleryEditor;
import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const CollegeGalleryModal = ({ isOpen, onClose, onSave, slide }) => {
  const [currentSlide, setCurrentSlide] = useState(slide);

  useEffect(() => {
    setCurrentSlide(slide);
  }, [slide]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSlide(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (currentSlide.image.trim() === '' || currentSlide.title.trim() === '') {
      alert('Image URL and Title are required!');
      return;
    }
    onSave(currentSlide);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentSlide._id ? 'Edit Gallery Slide' : 'Add Gallery Slide'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
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
        </div>
        <div className="editor-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CollegeGalleryModal;

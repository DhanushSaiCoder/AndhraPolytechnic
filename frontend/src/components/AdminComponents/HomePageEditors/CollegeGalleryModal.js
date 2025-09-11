import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import '../EditorModal.css';
import { getOptimizedImageUrl, uploadImage } from '../../../utils/cloudinaryUtils';

const CollegeGalleryModal = ({ isOpen, onClose, onSave, slide }) => {
  const [currentSlide, setCurrentSlide] = useState(slide);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCurrentSlide(slide);
  }, [slide]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSlide(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoadingImage(true);
    try {
      const publicId = await uploadImage(file);
      setCurrentSlide(prevState => ({ ...prevState, image: publicId }));
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Image upload failed: ' + error.message);
    } finally {
      setIsLoadingImage(false);
      event.target.value = '';
    }
  };

  const handleSave = () => {
    if (currentSlide.image.trim() === '' || currentSlide.title.trim() === '') {
      alert('Image and Title are required!');
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
            <div className="image-input-group">
              <input
                type="text"
                id="slideImage"
                name="image"
                value={isLoadingImage ? 'Uploading...' : getOptimizedImageUrl(currentSlide.image)}
                readOnly
                placeholder="Upload an image to see the URL"
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                accept="image/*"
              />
              <button
                type="button"
                className="btn-icon"
                title="Upload Image"
                onClick={() => fileInputRef.current.click()}
                disabled={isLoadingImage}
              >
                <Upload size={20} />
              </button>
            </div>
            {currentSlide.image && !isLoadingImage && (
              <div className="image-preview">
                <img src={getOptimizedImageUrl(currentSlide.image, { w: 100 })} alt="Preview" />
              </div>
            )}
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

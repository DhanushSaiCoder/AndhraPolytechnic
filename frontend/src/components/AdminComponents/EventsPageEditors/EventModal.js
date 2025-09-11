import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import '../EditorModal.css';
import { getOptimizedImageUrl, uploadImage } from '../../../utils/cloudinaryUtils';

const EventModal = ({ isOpen, onClose, onSave, event }) => {
  const [currentEvent, setCurrentEvent] = useState(event);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCurrentEvent(event);
  }, [event]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoadingImage(true);
    try {
      const publicId = await uploadImage(file);
      setCurrentEvent(prevState => ({ ...prevState, image: publicId }));
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Image upload failed: ' + error.message);
    } finally {
      setIsLoadingImage(false);
      event.target.value = '';
    }
  };

  const handleSave = () => {
    if (currentEvent.title.trim() === '') {
      alert('Title is required!');
      return;
    }
    onSave(currentEvent);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentEvent._id ? 'Edit Event' : 'Add Event'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={currentEvent.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Subtitle</label>
            <input type="text" name="subtitle" value={currentEvent.subtitle} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <div className="image-input-group">
              <input
                type="text"
                name="image"
                value={isLoadingImage ? 'Uploading...' : getOptimizedImageUrl(currentEvent.image)}
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
            {currentEvent.image && !isLoadingImage && (
              <div className="image-preview">
                <img src={getOptimizedImageUrl(currentEvent.image, { w: 100 })} alt="Preview" />
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={currentEvent.category} onChange={handleChange}>
              <option value="sports">Sports</option>
              <option value="academic">Academic</option>
              <option value="co-curricular">Co-curricular</option>
              <option value="other">Other</option>
            </select>
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

export default EventModal;

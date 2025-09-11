import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import '../EditorModal.css';
import { getOptimizedImageUrl, uploadImage } from '../../../utils/cloudinaryUtils';

const SuccessStoryModal = ({ isOpen, onClose, onSave, story }) => {
  const [currentStory, setCurrentStory] = useState(story);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCurrentStory(story);
  }, [story]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStory(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoadingImage(true);
    try {
      const publicId = await uploadImage(file);
      setCurrentStory(prevState => ({ ...prevState, image: publicId }));
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Image upload failed: ' + error.message);
    } finally {
      setIsLoadingImage(false);
      event.target.value = '';
    }
  };

  const handleSave = () => {
    if (currentStory.name.trim() === '' || currentStory.quote.trim() === '') {
      alert('Student Name and Quote are required!');
      return;
    }
    onSave(currentStory);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentStory._id ? 'Edit Success Story' : 'Add Success Story'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input type="text" id="name" name="name" value={currentStory.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" value={currentStory.company} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input type="text" id="role" name="role" value={currentStory.role} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="quote">Quote</label>
            <textarea id="quote" name="quote" value={currentStory.quote} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <div className="image-input-group">
              <input
                type="text"
                id="image"
                name="image"
                value={isLoadingImage ? 'Uploading...' : getOptimizedImageUrl(currentStory.image)}
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
            {currentStory.image && !isLoadingImage && (
              <div className="image-preview">
                <img src={getOptimizedImageUrl(currentStory.image, { w: 100 })} alt="Preview" />
              </div>
            )}
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

export default SuccessStoryModal;

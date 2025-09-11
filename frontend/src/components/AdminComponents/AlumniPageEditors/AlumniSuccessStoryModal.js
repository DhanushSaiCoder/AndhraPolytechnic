import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import '../EditorModal.css';
import { getOptimizedImageUrl, uploadImage } from '../../../utils/cloudinaryUtils';

const AlumniSuccessStoryModal = ({ isOpen, onClose, onSave, story }) => {
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
    if (currentStory.name.trim() === '') {
      alert('Name is required!');
      return;
    }
    onSave(currentStory);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentStory._id ? 'Edit Alumni Success Story' : 'Add Alumni Success Story'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={currentStory.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="text" name="year" value={currentStory.year} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Branch</label>
            <input type="text" name="field" value={currentStory.field} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input type="text" name="company" value={currentStory.company} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Position</label>
            <input type="text" name="position" value={currentStory.position} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Story</label>
            <textarea name="story" value={currentStory.story} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <div className="image-input-group">
              <input
                type="text"
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

export default AlumniSuccessStoryModal;

import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import '../EditorModal.css';
import { getOptimizedImageUrl } from '../../../utils/cloudinaryUtils';

const AboutUsAchievementModal = ({ isOpen, onClose, onSave, achievement }) => {
  const [currentAchievement, setCurrentAchievement] = useState(achievement);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCurrentAchievement(achievement);
  }, [achievement]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAchievement(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'First Preset'); // Your upload preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/drs62gumc/image/upload`, // Your Cloudinary URL
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url && data.public_id) {
        setCurrentAchievement(prevState => ({ ...prevState, image: data.public_id }));
        alert('Image uploaded successfully!');
      } else {
        alert('Image upload failed: ' + (data.error ? data.error.message : 'Unknown error'));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    } finally {
      setIsLoadingImage(false);
      // Clear the file input value so the same file can be uploaded again if needed
      event.target.value = '';
    }
  };

  const handleSave = () => {
    if (currentAchievement.title.trim() === '') {
      alert('Title is required!');
      return;
    }
    onSave(currentAchievement);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentAchievement._id ? 'Edit Achievement' : 'Add Achievement'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={currentAchievement.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Subtitle</label>
            <input type="text" name="subtitle" value={currentAchievement.subtitle} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <div className="image-input-group">
              <input
                type="text"
                name="image"
                value={isLoadingImage ? 'Uploading...' : getOptimizedImageUrl(currentAchievement.image)}
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
            {currentAchievement.image && !isLoadingImage && (
              <div className="image-preview">
                <img src={getOptimizedImageUrl(currentAchievement.image, { w: 100 })} alt="Preview" />
              </div>
            )}
          </div>
        </div>
        <div className="editor-modal-footer">
          <button className="se-btn" onClick={onClose}>Cancel</button>
          <button className="se-btn se-btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsAchievementModal;

import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import '../EditorModal.css';
import { getOptimizedImageUrl } from '../../../utils/cloudinaryUtils';

const AcademicAchievementModal = ({ isOpen, onClose, onSave, achievement }) => {
  const [currentAchievement, setCurrentAchievement] = useState(achievement);
  const [isLoadingImage, setIsLoadingImage] = useState({}); // Use object to track loading for multiple images
  const fileInputRefs = useRef({}); // Use object to store refs for multiple file inputs

  useEffect(() => {
    setCurrentAchievement(achievement);
  }, [achievement]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAchievement(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...currentAchievement.images];
    updatedImages[index] = value;
    setCurrentAchievement(prevState => ({ ...prevState, images: updatedImages }));
  };

  const handleImageUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoadingImage(prev => ({ ...prev, [index]: true }));
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
        const updatedImages = [...currentAchievement.images];
        updatedImages[index] = data.public_id;
        setCurrentAchievement(prevState => ({ ...prevState, images: updatedImages }));
        alert('Image uploaded successfully!');
      } else {
        alert('Image upload failed: ' + (data.error ? data.error.message : 'Unknown error'));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    } finally {
      setIsLoadingImage(prev => ({ ...prev, [index]: false }));
      event.target.value = '';
    }
  };

  const handleAddImage = () => {
    setCurrentAchievement(prevState => ({ ...prevState, images: [...prevState.images, ''] }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = currentAchievement.images.filter((_, i) => i !== index);
    setCurrentAchievement(prevState => ({ ...prevState, images: updatedImages }));
  };

  const handleSave = () => {
    if (currentAchievement.title.trim() === '') {
      alert('Title is required!');
      return;
    }
    const achievementData = {
      ...currentAchievement,
      images: currentAchievement.images.filter(img => img.trim() !== ''),
    };
    onSave(achievementData);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentAchievement._id ? 'Edit Academic Achievement' : 'Add Academic Achievement'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={currentAchievement.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={currentAchievement.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={currentAchievement.category} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <div className="form-section">
            <h4>Images</h4>
            {currentAchievement.images.map((image, index) => (
              <div key={index} className="dynamic-list-item">
                <div className="image-input-group">
                  <input
                    type="text"
                    value={isLoadingImage[index] ? 'Uploading...' : getOptimizedImageUrl(image)}
                    readOnly
                    placeholder="Upload an image to see the URL"
                  />
                  <input
                    type="file"
                    ref={el => fileInputRefs.current[index] = el}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, index)}
                    accept="image/*"
                  />
                  <button
                    type="button"
                    className="btn-icon"
                    title="Upload Image"
                    onClick={() => fileInputRefs.current[index].click()}
                    disabled={isLoadingImage[index]}
                  >
                    <Upload size={20} />
                  </button>
                </div>
                {image && !isLoadingImage[index] && (
                  <div className="image-preview">
                    <img src={getOptimizedImageUrl(image, { w: 100 })} alt="Preview" />
                  </div>
                )}
                <button type="button" onClick={() => handleRemoveImage(index)} className="remove-btn">Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddImage} className="add-btn">Add Image</button>
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

export default AcademicAchievementModal;

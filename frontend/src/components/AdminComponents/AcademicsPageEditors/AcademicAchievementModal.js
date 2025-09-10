import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const AcademicAchievementModal = ({ isOpen, onClose, onSave, achievement }) => {
  const [currentAchievement, setCurrentAchievement] = useState(achievement);

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
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Image URL"
                />
                <button type="button" onClick={() => handleRemoveImage(index)} className="remove-btn">Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddImage} className="add-btn">Add Image</button>
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

export default AcademicAchievementModal;

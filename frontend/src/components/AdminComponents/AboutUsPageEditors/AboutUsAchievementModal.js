import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import '../EditorModal.css';

const AboutUsAchievementModal = ({ isOpen, onClose, onSave, achievement }) => {
  const [currentAchievement, setCurrentAchievement] = useState(achievement);

  useEffect(() => {
    setCurrentAchievement(achievement);
  }, [achievement]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAchievement(prevState => ({ ...prevState, [name]: value }));
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
              <input type="text" name="image" value={currentAchievement.image} onChange={handleChange} />
              <button type="button" className="btn-icon" title="Upload Image"><Upload size={20} /></button>
            </div>
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

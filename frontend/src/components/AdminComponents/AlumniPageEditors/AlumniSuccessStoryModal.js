import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const AlumniSuccessStoryModal = ({ isOpen, onClose, onSave, story }) => {
  const [currentStory, setCurrentStory] = useState(story);

  useEffect(() => {
    setCurrentStory(story);
  }, [story]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStory(prevState => ({ ...prevState, [name]: value }));
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
            <input type="text" name="image" value={currentStory.image} onChange={handleChange} />
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

export default AlumniSuccessStoryModal;

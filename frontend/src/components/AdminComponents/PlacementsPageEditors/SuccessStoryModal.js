import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const SuccessStoryModal = ({ isOpen, onClose, onSave, story }) => {
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
            <input type="text" id="image" name="image" value={currentStory.image} onChange={handleChange} />
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

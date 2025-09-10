import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const UpdateModal = ({ isOpen, onClose, onSave, update }) => {
  const [currentUpdate, setCurrentUpdate] = useState(update);

  useEffect(() => {
    setCurrentUpdate(update);
  }, [update]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUpdate(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (currentUpdate.titleEn.trim() === '') {
      alert('Title is required!');
      return;
    }
    onSave(currentUpdate);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentUpdate._id ? 'Edit Update' : 'Add Update'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="titleEn">Title (English)</label>
            <input type="text" id="titleEn" name="titleEn" value={currentUpdate.titleEn} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="severity">Severity</label>
            <select id="severity" name="severity" value={currentUpdate.severity} onChange={handleChange}>
              <option value="info">Info</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={currentUpdate.date} onChange={handleChange} />
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

export default UpdateModal;

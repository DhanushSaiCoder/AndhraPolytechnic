import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const PlacementStatModal = ({ isOpen, onClose, onSave, stat }) => {
  const [currentStat, setCurrentStat] = useState(stat);

  useEffect(() => {
    setCurrentStat(stat);
  }, [stat]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStat(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (currentStat.value.trim() === '' || currentStat.label.trim() === '') {
      alert('Value and Label are required!');
      return;
    }
    onSave(currentStat);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentStat._id ? 'Edit Placement Stat' : 'Add Placement Stat'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="statIcon">Icon Name (e.g., Users, Briefcase, DollarSign)</label>
            <input type="text" id="statIcon" name="icon" value={currentStat.icon} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="statValue">Value</label>
            <input type="text" id="statValue" name="value" value={currentStat.value} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="statLabel">Label</label>
            <input type="text" id="statLabel" name="label" value={currentStat.label} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="statDescription">Description</label>
            <textarea id="statDescription" name="description" value={currentStat.description} onChange={handleChange}></textarea>
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

export default PlacementStatModal;

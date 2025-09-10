import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const PlacementProcessModal = ({ isOpen, onClose, onSave, step }) => {
  const [currentStep, setCurrentStep] = useState(step);

  useEffect(() => {
    setCurrentStep(step);
  }, [step]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStep(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (currentStep.title.trim() === '' || currentStep.description.trim() === '') {
      alert('Title and Description are required!');
      return;
    }
    onSave(currentStep);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentStep._id ? 'Edit Placement Process Step' : 'Add Placement Process Step'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={currentStep.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={currentStep.description} onChange={handleChange}></textarea>
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

export default PlacementProcessModal;

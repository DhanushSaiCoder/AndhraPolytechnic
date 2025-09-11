import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import '../EditorModal.css';

const RecruiterModal = ({ isOpen, onClose, onSave, recruiter }) => {
  const [currentRecruiter, setCurrentRecruiter] = useState(recruiter);

  useEffect(() => {
    setCurrentRecruiter(recruiter);
  }, [recruiter]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecruiter(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (currentRecruiter.name.trim() === '' || currentRecruiter.logo.trim() === '') {
      alert('Company Name and Logo URL are required!');
      return;
    }
    onSave(currentRecruiter);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentRecruiter._id ? 'Edit Recruiter' : 'Add Recruiter'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="name">Company Name</label>
            <input type="text" id="name" name="name" value={currentRecruiter.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="logo">Logo URL</label>
            <div className="image-input-group">
              <input type="text" id="logo" name="logo" value={currentRecruiter.logo} onChange={handleChange} />
              <button type="button" className="btn-icon" title="Upload Image"><Upload size={20} /></button>
            </div>
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

export default RecruiterModal;

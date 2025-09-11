import React, { useState, useEffect } from 'react';
import './EditorModal.css';

const SemesterEditorModal = ({ isOpen, onClose, onSave, semester }) => {
  const [semesterData, setSemesterData] = useState(semester);

  useEffect(() => {
    setSemesterData(semester);
  }, [semester]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setSemesterData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(semesterData);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{semesterData?._id ? 'Edit Semester' : 'Add Semester'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label>Semester Name</label>
            <input type="text" value={semesterData?.name || ''} onChange={e => handleChange('name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Semester Code</label>
            <input type="text" value={semesterData?.code || ''} onChange={e => handleChange('code', e.target.value)} />
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

export default SemesterEditorModal;

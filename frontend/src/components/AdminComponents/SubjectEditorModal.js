import React, { useState, useEffect } from 'react';
import './EditorModal.css';

const SubjectEditorModal = ({ isOpen, onClose, onSave, subject, semesters }) => {
  const [subjectData, setSubjectData] = useState(subject);

  useEffect(() => {
    setSubjectData(subject);
  }, [subject]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setSubjectData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(subjectData);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{subjectData?._id ? 'Edit Subject' : 'Add Subject'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label>Subject Name</label>
            <input type="text" value={subjectData?.name || ''} onChange={e => handleChange('name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Subject Code</label>
            <input type="text" value={subjectData?.code || ''} onChange={e => handleChange('code', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={subjectData?.description || ''} onChange={e => handleChange('description', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Semester</label>
            <select value={subjectData?.semesterCode || ''} onChange={e => handleChange('semesterCode', e.target.value)}>
              <option value="">-- Select Semester --</option>
              {semesters.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
            </select>
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

export default SubjectEditorModal;

import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const HighestPackageModal = ({ isOpen, onClose, onSave, pkg }) => {
  const [currentPackage, setCurrentPackage] = useState(pkg);

  useEffect(() => {
    setCurrentPackage(pkg);
  }, [pkg]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPackage(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (currentPackage.name.trim() === '' || currentPackage.package.trim() === '') {
      alert('Student Name and Package are required!');
      return;
    }
    onSave(currentPackage);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentPackage._id ? 'Edit Highest Package' : 'Add Highest Package'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input type="text" id="name" name="name" value={currentPackage.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input type="text" id="department" name="department" value={currentPackage.department} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="package">Package (e.g., 12 LPA)</label>
            <input type="text" id="package" name="package" value={currentPackage.package} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" value={currentPackage.company} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input type="number" id="year" name="year" value={currentPackage.year} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input type="text" id="image" name="image" value={currentPackage.image} onChange={handleChange} />
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

export default HighestPackageModal;

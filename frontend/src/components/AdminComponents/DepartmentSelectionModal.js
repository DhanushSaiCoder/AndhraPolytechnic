import React, { useState } from 'react';
import './DepartmentSelectionModal.css';

const DepartmentSelectionModal = ({ isOpen, onClose, departments, onSelect, currentDepartmentId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) {
    return null;
  }

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dsm-modal-overlay" onClick={onClose}>
      <div className="dsm-modal-content" onClick={e => e.stopPropagation()}>
        <div className="dsm-modal-header">
          <h3>Select a Department</h3>
          <button className="dsm-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="dsm-modal-body">
          <input 
            type="text" 
            placeholder="Search departments..." 
            className="dsm-search-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <ul className="dsm-dept-list">
            {filteredDepartments.map(dept => (
              <li 
                key={dept._id} 
                className={`dsm-dept-item ${dept._id === currentDepartmentId ? 'selected' : ''}`}
                onClick={() => onSelect(dept._id)}
              >
                {dept.name} ({dept.shortName})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DepartmentSelectionModal;

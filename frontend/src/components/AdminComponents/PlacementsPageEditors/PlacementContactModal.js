import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const PlacementContactModal = ({ isOpen, onClose, onSave, contactData }) => {
  const [contact, setContact] = useState(contactData);

  useEffect(() => {
    setContact(contactData);
  }, [contactData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    onSave(contact);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>Edit Placement Contact Content</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={contact.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" value={contact.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={contact.address} onChange={handleChange}></textarea>
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

export default PlacementContactModal;

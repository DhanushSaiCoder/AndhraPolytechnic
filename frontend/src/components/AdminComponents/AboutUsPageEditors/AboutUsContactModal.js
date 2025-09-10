import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const AboutUsContactModal = ({ isOpen, onClose, onSave, contactData }) => {
  const [contact, setContact] = useState(contactData);

  useEffect(() => {
    setContact(contactData);
  }, [contactData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prevState => ({ ...prevState, [name]: value }));
  };

  const handleOfficeHoursChange = (index, value) => {
    const updatedHours = [...contact.officeHours];
    updatedHours[index] = value;
    setContact(prevState => ({ ...prevState, officeHours: updatedHours }));
  };

  const handleAddOfficeHour = () => {
    setContact(prevState => ({ ...prevState, officeHours: [...prevState.officeHours, ''] }));
  };

  const handleRemoveOfficeHour = (index) => {
    const updatedHours = contact.officeHours.filter((_, i) => i !== index);
    setContact(prevState => ({ ...prevState, officeHours: updatedHours }));
  };

  const handleSave = () => {
    onSave(contact);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>Edit About Us Contact Information</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label>Address</label>
            <textarea name="address" value={contact.address} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" value={contact.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={contact.email} onChange={handleChange} />
          </div>

          <div className="form-section">
            <h4>Office Hours</h4>
            {contact.officeHours.map((hour, index) => (
              <div key={index} className="dynamic-list-item">
                <input
                  type="text"
                  value={hour}
                  onChange={(e) => handleOfficeHoursChange(index, e.target.value)}
                  placeholder="e.g., Monday - Friday: 9:00 AM - 5:00 PM"
                />
                <button type="button" onClick={() => handleRemoveOfficeHour(index)} className="remove-btn">Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddOfficeHour} className="add-btn">Add Office Hour</button>
          </div>
        </div>
        <div className="editor-modal-footer">
          <button className="se-btn" onClick={onClose}>Cancel</button>
          <button className="se-btn se-btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContactModal;

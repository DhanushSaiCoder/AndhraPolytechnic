import React, { useState, useEffect } from 'react';
import aboutUsContactService from '../../../services/aboutUsContactService';

const initialContactState = {
  address: '',
  phone: '',
  email: '',
  officeHours: [],
};

const AboutUsContactEditor = () => {
  const [contact, setContact] = useState(initialContactState);

  const fetchContact = async () => {
    try {
      const response = await aboutUsContactService.getContact();
      if (response.data) {
        setContact(response.data);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      alert('Failed to fetch contact info.');
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

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

  const handleSave = async () => {
    try {
      await aboutUsContactService.updateContact(contact);
      alert('Contact info updated successfully!');
    } catch (error) {
      console.error('Error saving contact info:', error);
      alert('Failed to save contact info.');
    }
  };

  return (
    <section className="admin-section">
      <h3>About Us Contact Information</h3>

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

      <div className="form-actions">
        <button onClick={handleSave} className="save-btn">Save Changes</button>
      </div>
    </section>
  );
};

export default AboutUsContactEditor;

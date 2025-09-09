import React, { useState, useEffect } from 'react';
import placementContactService from '../../../services/placementContactService';

const PlacementContactEditor = () => {
  const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await placementContactService.getPlacementContact();
        if (response.data) {
          setContactData(response.data);
        }
      } catch (error) {
        console.error('Error fetching placement contact data:', error);
        alert('Failed to fetch placement contact data.');
      }
    };
    fetchContactData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await placementContactService.updatePlacementContact(contactData);
      alert('Placement Contact data saved successfully!');
    } catch (error) {
      console.error('Error saving placement contact data:', error);
      alert('Failed to save placement contact data.');
    }
  };

  const handleCancel = () => {
    // Re-fetch to reset to original state
    const fetchContactData = async () => {
      try {
        const response = await placementContactService.getPlacementContact();
        if (response.data) {
          setContactData(response.data);
        }
      } catch (error) {
        console.error('Error fetching placement contact data:', error);
        alert('Failed to fetch placement contact data.');
      }
    };
    fetchContactData();
  };

  return (
    <section className="admin-section">
      <h3>Placement Contact Content</h3>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={contactData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" name="phone" value={contactData.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea id="address" name="address" value={contactData.address} onChange={handleChange}></textarea>
      </div>

      <div className="form-actions">
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={handleCancel} className="cancel-btn">Cancel</button>
      </div>
    </section>
  );
};

export default PlacementContactEditor;
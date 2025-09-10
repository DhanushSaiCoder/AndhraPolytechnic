import React, { useState, useEffect } from 'react';
import placementContactService from '../../../services/placementContactService';
import PlacementContactModal from './PlacementContactModal'; // Import the new modal

const PlacementContactEditor = () => {
  const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    address: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    fetchContactData();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveContact = async (data) => {
    try {
      await placementContactService.updatePlacementContact(data);
      alert('Placement Contact data saved successfully!');
      fetchContactData(); // Re-fetch to ensure UI is updated
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving placement contact data:', error);
      alert('Failed to save placement contact data.');
    }
  };

  return (
    <section className="admin-section">
      <h3>Placement Contact Content</h3>

      <p><strong>Email:</strong> {contactData.email || 'N/A'}</p>
      <p><strong>Phone:</strong> {contactData.phone || 'N/A'}</p>
      <p><strong>Address:</strong> {contactData.address || 'N/A'}</p>

      <div className="form-actions">
        <button onClick={handleEditClick} className="save-btn">Edit Contact Info</button>
      </div>

      <PlacementContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
        contactData={contactData}
      />
    </section>
  );
};

export default PlacementContactEditor;

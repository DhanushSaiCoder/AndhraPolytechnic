import React, { useState, useEffect, useCallback } from 'react';
import placementContactService from '../../../services/placementContactService';
import PlacementContactModal from './PlacementContactModal';
import Loader from '../../Loader';

const PlacementContactEditor = () => {
  const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    address: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContactData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await placementContactService.getPlacementContact();
      if (response.data) {
        setContactData(response.data);
      }
    } catch (error) {
      console.error('Error fetching placement contact data:', error);
      alert('Failed to fetch placement contact data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContactData();
  }, [fetchContactData]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveContact = async (data) => {
    try {
      await placementContactService.updatePlacementContact(data);
      alert('Placement Contact data saved successfully!');
      fetchContactData();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving placement contact data:', error);
      alert('Failed to save placement contact data.');
    }
  };

  if (isLoading) {
    return <Loader text="Loading Contact Info..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>Placement Contact Content</h3>
        <button onClick={handleEditClick} className="btn btn-primary">Edit Contact Info</button>
      </div>

      <div className="details-view">
        <p><strong>Email:</strong> {contactData.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {contactData.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {contactData.address || 'N/A'}</p>
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

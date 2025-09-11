import React, { useState, useEffect, useCallback } from 'react';
import aboutUsContactService from '../../../services/aboutUsContactService';
import AboutUsContactModal from './AboutUsContactModal';
import Loader from '../../Loader';

const initialContactState = {
  address: '',
  phone: '',
  email: '',
  officeHours: [],
};

const AboutUsContactEditor = () => {
  const [contact, setContact] = useState(initialContactState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContact = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await aboutUsContactService.getContact();
      if (response.data) {
        setContact(response.data);
      } else {
        setContact(initialContactState);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      alert('Failed to fetch contact info.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveContact = async (contactData) => {
    try {
      await aboutUsContactService.updateContact(contactData);
      alert('Contact info updated successfully!');
      fetchContact();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving contact info:', error);
      alert('Failed to save contact info.');
    }
  };

  if (isLoading) {
    return <Loader text="Loading Contact Info..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>About Us Contact Information</h3>
        <button onClick={handleEditClick} className="btn btn-primary">Edit Contact Info</button>
      </div>

      <div className="details-view">
        <p><strong>Address:</strong> {contact.address || 'N/A'}</p>
        <p><strong>Phone:</strong> {contact.phone || 'N/A'}</p>
        <p><strong>Email:</strong> {contact.email || 'N/A'}</p>
        <p><strong>Office Hours:</strong></p>
        <ul>
          {contact.officeHours.length > 0 ? (
            contact.officeHours.map((hour, index) => <li key={index}>{hour}</li>)
          ) : (
            <li>N/A</li>
          )}
        </ul>
      </div>

      <AboutUsContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
        contactData={contact}
      />
    </section>
  );
};

export default AboutUsContactEditor;

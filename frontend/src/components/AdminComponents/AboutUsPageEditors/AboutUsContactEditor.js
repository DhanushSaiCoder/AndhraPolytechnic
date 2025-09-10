import React, { useState, useEffect } from 'react';
import aboutUsContactService from '../../../services/aboutUsContactService';
import AboutUsContactModal from './AboutUsContactModal'; // Import the new modal

const initialContactState = {
  address: '',
  phone: '',
  email: '',
  officeHours: [],
};

const AboutUsContactEditor = () => {
  const [contact, setContact] = useState(initialContactState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchContact = async () => {
    try {
      const response = await aboutUsContactService.getContact();
      if (response.data) {
        setContact(response.data);
      } else {
        setContact(initialContactState); // Reset if no data
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      alert('Failed to fetch contact info.');
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveContact = async (contactData) => {
    try {
      await aboutUsContactService.updateContact(contactData);
      alert('Contact info updated successfully!');
      fetchContact(); // Re-fetch to ensure UI is updated
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving contact info:', error);
      alert('Failed to save contact info.');
    }
  };

  return (
    <section className="admin-section">
      <h3>About Us Contact Information</h3>

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

      <div className="form-actions">
        <button onClick={handleEditClick} className="save-btn">Edit Contact Info</button>
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

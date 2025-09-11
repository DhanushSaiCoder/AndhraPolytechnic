import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import '../../styles/PlacementsStyles/PlacementContact.css';
import placementContactService from '../../services/placementContactService'; // Import service
import PlacementContactSkeleton from './PlacementContactSkeleton';

const PlacementContact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: 'loading...',
    phone: 'loading...',
    address: 'loading...',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await placementContactService.getPlacementContact();
        if (response.data) {
          setContactInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching placement contact info:', error);
        setContactInfo({
          email: 'N/A',
          phone: 'N/A',
          address: 'N/A',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  if (loading) {
    return <PlacementContactSkeleton />;
  }

  return (
    <section className="placement-contact-section">
      <div className="placement-contact-container">
        <header className="placement-contact-header">
          <h2>Contact Our Placement Cell</h2>
          <p>Reach out to us for any placement-related queries or collaborations.</p>
        </header>

        <div className="contact-info-grid">
          <div className="contact-card">
            <Mail size={32} className="contact-icon" />
            <h3>Email Us</h3>
            <p>{contactInfo.email}</p>
          </div>
          <div className="contact-card">
            <Phone size={32} className="contact-icon" />
            <h3>Call Us</h3>
            <p>{contactInfo.phone}</p>
          </div>
          <div className="contact-card">
            <MapPin size={32} className="contact-icon" />
            <h3>Visit Us</h3>
            <p>{contactInfo.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementContact;

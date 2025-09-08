import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import '../../styles/PlacementsStyles/PlacementContact.css';

const PlacementContact = () => {
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
            <p>placement@andhrapolytechnic.ac.in</p>
          </div>
          <div className="contact-card">
            <Phone size={32} className="contact-icon" />
            <h3>Call Us</h3>
            <p>+91-1234567890</p>
          </div>
          <div className="contact-card">
            <MapPin size={32} className="contact-icon" />
            <h3>Visit Us</h3>
            <p>Andhra Polytechnic College, Kakinada, Andhra Pradesh</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementContact;

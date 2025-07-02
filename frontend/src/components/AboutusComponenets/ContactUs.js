import React from 'react';
import '../../styles/AboutUsStyles/ContactUs.css';
import AptMap from '../../images/aptmap.png'

const ContactSection = () => {
  return (
    <div className="contact-container">
      {/* Map Thumbnail with Link */}
      <div className="contact-map">
        <a
          href="https://maps.app.goo.gl/1ZSGSRvbaCJVoRyUA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={AptMap}
            alt="Andhra Polytechnic Location"
            className="map-image"
          />
        </a>
      </div>

      {/* Contact Info */}
      <div className="contact-info">
        <h2 className="contact-title">Contact Information</h2>
        <div className="contact-info-item">
          <span className="contact-icon">📍</span>
          <span>Andhra Polytechnic, Bapatla, Andhra Pradesh - 522101</span>
        </div>
        <div className="contact-info-item">
          <span className="contact-icon">📞</span>
          <span>(08643) 224244</span>
        </div>
        <div className="contact-info-item">
          <span className="contact-icon">✉️</span>
          <span>info@andhrapolytechnic.edu.in</span>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
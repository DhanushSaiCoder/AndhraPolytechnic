// ContactSection.jsx
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Map from './Map';
import '../../styles/AboutUsStyles/ContactUs.css'; // Importing the CSS file for styling

const ContactUs = () => {
  return (
    <section className="contact-section">
      <div className="contact-section__container">
        {/* Section Header */}
        <div className="contact-section__header">
          <h2 className="contact-section__title">Contact Information</h2>
          {/* <div className="contact-section__divider"></div> */}
          <p className="contact-section__description">
            Get in touch with us for admissions, inquiries, or any assistance you need.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="contact-section__grid">
          {/* Contact Information Card */}
          <div className="contact-card">
            <h3 className="contact-card__title">Get In Touch</h3>
            <div className="contact-card__items">
              {/* Address */}
              <div className="contact-item">
                <div className="contact-item__icon contact-item__icon--blue">
                  <MapPin />
                </div>
                <div className="contact-item__content">
                  <h4 className="contact-item__label">Address</h4>
                  <p className="contact-item__text">
                    Andhra Polytechnic, Kakinada,<br />
                    Andhra Pradesh - 533002
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-item">
                <div className="contact-item__icon contact-item__icon--green">
                  <Phone />
                </div>
                <div className="contact-item__content">
                  <h4 className="contact-item__label">Phone</h4>
                  <a href="tel:+918643224244" className="contact-item__link">
                    099123 42010

                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="contact-item">
                <div className="contact-item__icon contact-item__icon--purple">
                  <Mail />
                </div>
                <div className="contact-item__content">
                  <h4 className="contact-item__label">Email</h4>
                  <a href="mailto:principal_apt@yahoo.co.in" className="contact-item__link">
                    principal_apt@yahoo.co.in
                  </a>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="office-hours">
              <h4 className="office-hours__title">Office Hours</h4>
              <div className="office-hours__list">
                <p><span className="office-hours__day">Monday - Friday:</span> 9:00 AM - 5:00 PM</p>
                <p><span className="office-hours__day">Saturday:</span> 9:00 AM - 1:00 PM</p>
                <p><span className="office-hours__day">Sunday:</span> Closed</p>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="map-card">
            <div className="map-card__header">
              <h3 className="map-card__title">Find Us Here</h3>
              <p className="map-card__text">Located in the heart of Bapatla, Andhra Pradesh</p>
            </div>
            <div className="map-card__map">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

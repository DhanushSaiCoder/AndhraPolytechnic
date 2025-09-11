import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Map from './Map';
import aboutUsContactService from '../../services/aboutUsContactService';
import '../../styles/AboutUsStyles/ContactUs.css'; // Importing the CSS file for styling

const ContactUs = () => {
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      setIsLoading(true);
      try {
        const response = await aboutUsContactService.getContact();
        setContact(response.data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (!contact) {
    return <div>No contact information available.</div>;
  }

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
                    {contact.address.split('\n').map((line, index) => (
                      <React.Fragment key={index}>{line}<br /></React.Fragment>
                    ))}
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
                  <a href={`tel:${contact.phone}`} className="contact-item__link">
                    {contact.phone}
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
                  <a href={`mailto:${contact.email}`} className="contact-item__link">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="office-hours">
              <h4 className="office-hours__title">Office Hours</h4>
              <div className="office-hours__list">
                {contact.officeHours.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
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
import React from 'react';
import '../../styles/PlacementsStyles/PlacementContact.css';

const PlacementContactSkeleton = () => {
  return (
    <section className="placement-contact-section">
      <div className="placement-contact-container">
        <header className="placement-contact-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </header>

        <div className="contact-info-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="contact-card">
              <div className="skeleton skeleton-icon"></div>
              <div className="skeleton skeleton-card-title"></div>
              <div className="skeleton skeleton-card-text"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementContactSkeleton;

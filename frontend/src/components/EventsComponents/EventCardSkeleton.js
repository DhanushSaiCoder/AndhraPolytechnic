import React from 'react';
import '../../styles/EventsStyles/EventsPage.css';

const EventCardSkeleton = () => {
  return (
    <section className="event-category-section">
      <div className="event-category-header">
        <div className="event-category-heading">
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton skeleton-title"></div>
        </div>
        <div className="skeleton skeleton-subtitle"></div>
      </div>
      <div className="event-layout-split">
        <div className="event-slider-container">
          <div className="skeleton skeleton-slider"></div>
        </div>
        <div className="event-details">
          <div className="skeleton skeleton-event-title"></div>
          <div className="skeleton skeleton-event-subtitle"></div>
        </div>
      </div>
    </section>
  );
};

export default EventCardSkeleton;

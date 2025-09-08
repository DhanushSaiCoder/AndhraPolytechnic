import React from 'react';
import EventsHeroSection from '../components/EventsComponents/EventsHeroSection';

const EventsPage = () => {
  return (
    <div>
      <EventsHeroSection />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Upcoming Events</h1>
        <p>Content for Events will go here.</p>
      </div>
    </div>
  );
};

export default EventsPage;
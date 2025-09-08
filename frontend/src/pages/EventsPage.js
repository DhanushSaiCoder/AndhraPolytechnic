import React from 'react';
import EventsHeroSection from '../components/EventsComponents/EventsHeroSection';
import SportsEvents from '../components/EventsComponents/SportsEvents';
import AcademicEvents from '../components/EventsComponents/AcademicEvents';
import CoCurricularEvents from '../components/EventsComponents/CoCurricularEvents';
import OtherEvents from '../components/EventsComponents/OtherEvents';
import '../styles/EventsStyles/EventsPage.css';

const EventsPage = () => {
  return (
    <div>
      <EventsHeroSection />
      <div className="events-page-container">
        <SportsEvents />
        <AcademicEvents />
        <CoCurricularEvents />
        <OtherEvents />
      </div>
    </div>
  );
};

export default EventsPage;

import React from 'react';
import ImageSlider from '../HomeComponents/ImageSlider';
import { eventsData } from '../../data/eventsData';
import '../../styles/EventsStyles/EventsPage.css';

const AcademicEvents = () => {
  return (
    <section className="event-category-section academic-events">
      <h2 className="event-category-title">Academic</h2>
      <ImageSlider slides={eventsData.academic} />
    </section>
  );
};

export default AcademicEvents;

import React from 'react';
import ImageSlider from '../HomeComponents/ImageSlider';
import { eventsData } from '../../data/eventsData';
import '../../styles/EventsStyles/EventsPage.css';

const SportsEvents = () => {
  return (
    <section className="event-category-section sports-events">
      <h2 className="event-category-title">Sports</h2>
      <ImageSlider slides={eventsData.sports} />
    </section>
  );
};

export default SportsEvents;

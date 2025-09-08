import React from 'react';
import ImageSlider from '../HomeComponents/ImageSlider';
import { eventsData } from '../../data/eventsData';
import '../../styles/EventsStyles/EventsPage.css';

const OtherEvents = () => {
  return (
    <section className="event-category-section">
      <h2 className="event-category-title">Other</h2>
      <ImageSlider slides={eventsData.other} />
    </section>
  );
};

export default OtherEvents;

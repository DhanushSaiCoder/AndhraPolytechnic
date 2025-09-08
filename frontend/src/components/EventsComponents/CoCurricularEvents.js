import React from 'react';
import ImageSlider from '../HomeComponents/ImageSlider';
import { eventsData } from '../../data/eventsData';
import '../../styles/EventsStyles/EventsPage.css';

const CoCurricularEvents = () => {
  return (
    <section className="event-category-section co-curricular-events">
      <h2 className="event-category-title">Co-Curricular</h2>
      <ImageSlider slides={eventsData['co-curricular']} />
    </section>
  );
};

export default CoCurricularEvents;

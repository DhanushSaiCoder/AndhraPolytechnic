import React from 'react';
import { CalendarX } from 'lucide-react';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const EventsSection = () => {
  return (
    <div className="department-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            Events
          </h2>
          <p className="section-subtitle">
            Upcoming events and workshops in the department.
          </p>
        </div>
        <div className="events-list">
          <div className="no-events">
            <CalendarX size={48} />
            <p>No upcoming events at the moment. Please check back later.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
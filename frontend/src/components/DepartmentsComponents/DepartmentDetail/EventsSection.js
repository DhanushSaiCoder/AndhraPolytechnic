import React from 'react';
import { CalendarX, Calendar, MapPin } from 'lucide-react'; // Import Calendar and MapPin icons
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const EventsSection = ({ events }) => {
  // Sort all events by date in descending order (newest first)
  const sortedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="department-section events-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            Events
          </h2>
          <p className="section-subtitle">
            Stay updated with our department's activities and achievements.
          </p>
        </div>

        {sortedEvents.length > 0 ? (
          <div className="events-category">
            <div className="events-grid">
              {sortedEvents.map((event, index) => (
                <div key={index} className="event-card"> {/* Removed 'completed' class */} 
                  <h3>{event.title}</h3>
                  <p className="event-meta">
                    <Calendar size={16} /> {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="event-meta">
                    <MapPin size={16} /> {event.location}
                  </p>
                  <p className="event-description">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-events">
            <CalendarX size={48} />
            <p>No events available for this department at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsSection;
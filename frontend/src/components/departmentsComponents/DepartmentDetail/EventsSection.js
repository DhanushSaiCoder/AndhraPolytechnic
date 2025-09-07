import React from 'react';
import { CalendarX, Calendar, MapPin } from 'lucide-react'; // Import Calendar and MapPin icons
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const EventsSection = ({ events }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to start of day

  const upcomingEvents = events.filter(event => new Date(event.date) >= today)
                               .sort((a, b) => new Date(a.date) - new Date(b.date));

  const completedEvents = events.filter(event => new Date(event.date) < today)
                                .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort completed in descending order

  return (
    <div className="department-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            Events
          </h2>
          <p className="section-subtitle">
            Stay updated with our department's activities and achievements.
          </p>
        </div>

        {upcomingEvents.length > 0 && (
          <div className="events-category">
            <h3 className="events-category-title">Upcoming Events</h3>
            <div className="events-grid">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="event-card">
                  <h3>{event.title}</h3>
                  <p className="event-meta">
                    <Calendar size={16} /> {event.date}
                  </p>
                  <p className="event-meta">
                    <MapPin size={16} /> {event.location}
                  </p>
                  <p className="event-description">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedEvents.length > 0 && (
          <div className="events-category">
            <h3 className="events-category-title">Completed Events</h3>
            <div className="events-grid">
              {completedEvents.map((event, index) => (
                <div key={index} className="event-card completed"> {/* Add 'completed' class for styling */}
                  <h3>{event.title}</h3>
                  <p className="event-meta">
                    <Calendar size={16} /> {event.date}
                  </p>
                  <p className="event-meta">
                    <MapPin size={16} /> {event.location}
                  </p>
                  <p className="event-description">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {upcomingEvents.length === 0 && completedEvents.length === 0 && (
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
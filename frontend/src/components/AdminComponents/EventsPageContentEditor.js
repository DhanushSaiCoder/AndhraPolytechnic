import React, { useState, useEffect } from 'react';
import eventService from '../../services/eventService';
import EventModal from './EventsPageEditors/EventModal'; // Import the new modal

const initialEventState = {
  _id: '',
  title: '',
  subtitle: '',
  image: '',
  category: 'sports',
};

const EventsPageContentEditor = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await eventService.getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddClick = () => {
    setEditingEvent({ ...initialEventState });
    setIsModalOpen(true);
  };

  const handleEditClick = (event) => {
    setEditingEvent({ ...initialEventState, ...event });
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      if (eventData._id) {
        await eventService.updateEvent(eventData._id, eventData);
        alert('Event updated successfully!');
      } else {
        const { _id, ...rest } = eventData;
        await eventService.createEvent(rest);
        alert('Event added successfully!');
      }
      fetchEvents();
      setIsModalOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        alert('Event deleted successfully!');
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event.');
      }
    }
  };

  const renderList = (category) => (
    <div className="category-section">
      <h4 style={{ textTransform: 'capitalize' }}>{category.replace('-', ' ')} Events</h4>
      <ul className="admin-list">
        {events.filter(event => event.category === category).map(item => (
          <li key={item._id} className="admin-list-item">
            <span>{item.title}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditClick(item)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="admin-section">
      <h3>Events Page Content</h3>

      <div className="form-actions">
        <button onClick={handleAddClick} className="save-btn">Add New Event</button>
      </div>

      <hr style={{ margin: '3rem 0' }} />

      {renderList('sports')}
      {renderList('academic')}
      {renderList('co-curricular')}
      {renderList('other')}

      {editingEvent && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          event={editingEvent}
        />
      )}
    </section>
  );
};

export default EventsPageContentEditor;

import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import eventService from '../../services/eventService';
import EventModal from './EventsPageEditors/EventModal';
import './AdminEditors.css';
import Loader from '../Loader';

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await eventService.getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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
      <ul className="admin-simple-list">
        {events.filter(event => event.category === category).map(item => (
          <li key={item._id} className="admin-simple-list-item">
            <span>{item.title}</span>
            <div className="admin-list-item-actions">
              <button onClick={() => handleEditClick(item)} className="btn-icon" title="Edit"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(item._id)} className="btn-icon btn-danger" title="Delete"><Trash2 size={18} /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  if (isLoading) {
    return <Loader text="Loading Events..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>Events Page Content</h3>
        <button onClick={handleAddClick} className="btn btn-primary">Add New Event</button>
      </div>

      {renderList('sports')}
      <div className="editor-separator"></div>
      {renderList('academic')}
      <div className="editor-separator"></div>
      {renderList('co-curricular')}
      <div className="editor-separator"></div>
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

import React, { useState, useEffect } from 'react';
import eventService from '../../services/eventService';

const initialEventState = {
  _id: '',
  title: '',
  subtitle: '',
  image: '',
  category: 'sports',
};

const EventsPageContentEditor = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({ ...initialEventState });
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    if (currentEvent.title.trim() === '') return;
    try {
      if (editingId) {
        await eventService.updateEvent(editingId, currentEvent);
        alert('Event updated successfully!');
      } else {
        const { _id, ...rest } = currentEvent;
        await eventService.createEvent(rest);
        alert('Event added successfully!');
      }
      fetchEvents();
      setCurrentEvent({ ...initialEventState });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event.');
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent({ ...initialEventState, ...event });
    setEditingId(event._id);
    window.scrollTo(0, 0);
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
              <button onClick={() => handleEdit(item)} className="action-btn edit-btn">Edit</button>
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

      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" value={currentEvent.title} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Subtitle</label>
        <input type="text" name="subtitle" value={currentEvent.subtitle} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input type="text" name="image" value={currentEvent.image} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select name="category" value={currentEvent.category} onChange={handleChange}>
          <option value="sports">Sports</option>
          <option value="academic">Academic</option>
          <option value="co-curricular">Co-curricular</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-actions">
        <button onClick={handleSave} className="save-btn">{editingId ? 'Save Changes' : 'Add Event'}</button>
        {editingId && <button onClick={() => { setEditingId(null); setCurrentEvent({ ...initialEventState }); }} className="cancel-btn">Cancel Edit</button>}
      </div>

      <hr style={{ margin: '3rem 0' }} />

      {renderList('sports')}
      {renderList('academic')}
      {renderList('co-curricular')}
      {renderList('other')}
    </section>
  );
};

export default EventsPageContentEditor;

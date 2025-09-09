import React, { useState, useEffect } from 'react';
import updateService from '../../../services/updateService'; // Import the service

const UpdatesMarqueeEditor = () => {
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState({
    id: '',
    titleEn: '',
    severity: 'info',
    date: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchUpdates = async () => {
    try {
      const response = await updateService.getUpdates();
      // Format date for input type="date"
      const formattedUpdates = response.data.map(update => ({
        ...update,
        date: update.date ? new Date(update.date).toISOString().split('T')[0] : '',
      }));
      setUpdates(formattedUpdates);
    } catch (error) {
      console.error('Error fetching updates:', error);
      alert('Failed to fetch updates.');
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUpdate(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddUpdate = async () => {
    if (newUpdate.titleEn.trim() === '') return;
    try {
      if (editingId) {
        await updateService.updateUpdate(editingId, newUpdate);
        alert('Update updated successfully!');
      } else {
        await updateService.createUpdate(newUpdate);
        alert('Update added successfully!');
      }
      fetchUpdates(); // Re-fetch updates to get the latest data from backend
      setNewUpdate({
        id: '',
        titleEn: '',
        severity: 'info',
        date: '',
      });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving update:', error);
      alert('Failed to save update.');
    }
  };

  const handleEdit = (update) => {
    // Ensure date is formatted for input type="date"
    setNewUpdate({
      ...update,
      date: update.date ? new Date(update.date).toISOString().split('T')[0] : '',
    });
    setEditingId(update._id); // Use _id from MongoDB
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      try {
        await updateService.deleteUpdate(id);
        alert('Update deleted successfully!');
        fetchUpdates(); // Re-fetch updates
      } catch (error) {
        console.error('Error deleting update:', error);
        alert('Failed to delete update.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>Updates Marquee Content</h3>

      <div className="form-group">
        <label htmlFor="titleEn">Title (English)</label>
        <input type="text" id="titleEn" name="titleEn" value={newUpdate.titleEn} onChange={handleChange} />
      </div>
      
      
      <div className="form-group">
        <label htmlFor="severity">Severity</label>
        <select id="severity" name="severity" value={newUpdate.severity} onChange={handleChange}>
          <option value="info">Info</option>
          <option value="important">Important</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" value={newUpdate.date} onChange={handleChange} />
      </div>
      <div className="form-actions">
        <button onClick={handleAddUpdate} className="save-btn">{editingId ? 'Save Changes' : 'Add Update'}</button>
        {editingId && <button onClick={() => {setEditingId(null); setNewUpdate({ id: '', titleEn: '', severity: 'info', date: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Updates</h4>
      <ul className="admin-list">
        {updates.map(update => (
          <li key={update._id} className="admin-list-item">
            <span>{update.titleEn} ({update.severity}) - {update.date}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(update)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(update._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UpdatesMarqueeEditor;
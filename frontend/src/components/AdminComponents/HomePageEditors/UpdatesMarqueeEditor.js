import React, { useState, useEffect } from 'react';

const UpdatesMarqueeEditor = () => {
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState({
    id: '',
    titleEn: '',
    link: '',
    severity: 'info',
    date: '',
  });
  const [editingId, setEditingId] = useState(null);

  // In a real app, fetch updates from backend here
  useEffect(() => {
    // Simulate fetching data
    const dummyUpdates = [
      { id: '1', titleEn: 'New Semester Begins', link: '/news/1', severity: 'info', date: '2023-08-20' },
      { id: '2', titleEn: 'Library Renovation', link: '/news/2', severity: 'urgent', date: '2023-08-22' },
      { id: '3', titleEn: 'Guest Lecture on Data Science', link: '/events/3', severity: 'important', date: '2023-08-25' },
    ];
    setUpdates(dummyUpdates);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUpdate(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddUpdate = () => {
    if (newUpdate.titleEn.trim() === '') return;
    const id = editingId || String(updates.length + 1); // Simple ID generation
    const updatedList = editingId
      ? updates.map(update => (update.id === editingId ? { ...newUpdate, id } : update))
      : [...updates, { ...newUpdate, id }];
    setUpdates(updatedList);
    setNewUpdate({
      id: '',
      titleEn: '',
      link: '',
      severity: 'info',
      date: '',
    });
    setEditingId(null);
    // In a real app, send data to backend
    alert('Update saved!');
  };

  const handleEdit = (update) => {
    setNewUpdate(update);
    setEditingId(update.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      setUpdates(updates.filter(update => update.id !== id));
      // In a real app, send delete request to backend
      alert('Update deleted!');
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
        <label htmlFor="link">Link</label>
        <input type="text" id="link" name="link" value={newUpdate.link} onChange={handleChange} />
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
        {editingId && <button onClick={() => {setEditingId(null); setNewUpdate({ id: '', titleEn: '', link: '', severity: 'info', date: '' });}} className="cancel-btn">Cancel Edit</button>}}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Updates</h4>
      <ul className="admin-list">
        {updates.map(update => (
          <li key={update.id} className="admin-list-item">
            <span>{update.titleEn} ({update.severity}) - {update.date}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(update)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(update.id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UpdatesMarqueeEditor;
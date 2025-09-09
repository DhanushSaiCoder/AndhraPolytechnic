import React, { useState, useEffect } from 'react';

const NoticeBoardEditor = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [currentNewsItem, setCurrentNewsItem] = useState({
    id: '',
    title: '',
    description: '',
    date: '',
  });
  const [currentNotification, setCurrentNotification] = useState({
    id: '',
    title: '',
    description: '',
    date: '',
  });

  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editingNotificationId, setEditingNotificationId] = useState(null);

  // Simulate fetching data
  useEffect(() => {
    const dummyNews = [
      { id: 'n1', title: 'New Semester Begins', description: 'The new semester will start on 1st September.', date: '2023-08-20' },
      { id: 'n2', title: 'Library Renovation', description: 'The library will be closed for renovation.', date: '2023-08-22' },
    ];
    const dummyNotifications = [
      { id: 'nt1', title: 'Campus Wi-Fi Upgrade', description: 'The campus Wi-Fi will be upgraded.', date: '2023-08-31' },
      { id: 'nt2', title: 'New Course Offerings', description: 'New courses in Data Science and Machine Learning.', date: '2023-08-30' },
    ];
    setNewsItems(dummyNews);
    setNotifications(dummyNotifications);
  }, []);

  const handleNewsChange = (e) => {
    const { name, value } = e.target;
    setCurrentNewsItem(prevState => ({ ...prevState, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, value } = e.target;
    setCurrentNotification(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddNews = () => {
    if (currentNewsItem.title.trim() === '') return;
    const id = editingNewsId || `n${newsItems.length + 1}`;
    const updatedList = editingNewsId
      ? newsItems.map(item => (item.id === editingNewsId ? { ...currentNewsItem, id } : item))
      : [...newsItems, { ...currentNewsItem, id }];
    setNewsItems(updatedList);
    setCurrentNewsItem({ id: '', title: '', description: '', date: '' });
    setEditingNewsId(null);
    alert('News item saved!');
  };

  const handleAddNotification = () => {
    if (currentNotification.title.trim() === '') return;
    const id = editingNotificationId || `nt${notifications.length + 1}`;
    const updatedList = editingNotificationId
      ? notifications.map(item => (item.id === editingNotificationId ? { ...currentNotification, id } : item))
      : [...notifications, { ...currentNotification, id }];
    setNotifications(updatedList);
    setCurrentNotification({ id: '', title: '', description: '', date: '' });
    setEditingNotificationId(null);
    alert('Notification saved!');
  };

  const handleEditNews = (item) => {
    setCurrentNewsItem(item);
    setEditingNewsId(item.id);
  };

  const handleDeleteNews = (id) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      setNewsItems(newsItems.filter(item => item.id !== id));
      alert('News item deleted!');
    }
  };

  const handleEditNotification = (item) => {
    setCurrentNotification(item);
    setEditingNotificationId(item.id);
  };

  const handleDeleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(notifications.filter(item => item.id !== id));
      alert('Notification deleted!');
    }
  };

  return (
    <section className="admin-section">
      <h3>News & Notifications Content</h3>

      {/* News Section */}
      <h4>Manage News</h4>
      <div className="form-group">
        <label htmlFor="newsTitle">Title</label>
        <input type="text" id="newsTitle" name="title" value={currentNewsItem.title} onChange={handleNewsChange} />
      </div>
      <div className="form-group">
        <label htmlFor="newsDescription">Description</label>
        <textarea id="newsDescription" name="description" value={currentNewsItem.description} onChange={handleNewsChange}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="newsDate">Date</label>
        <input type="date" id="newsDate" name="date" value={currentNewsItem.date} onChange={handleNewsChange} />
      </div>
      <div className="form-actions">
        <button onClick={handleAddNews} className="save-btn">{editingNewsId ? 'Save Changes' : 'Add News'}</button>
        {editingNewsId && <button onClick={() => {setEditingNewsId(null); setCurrentNewsItem({ id: '', title: '', description: '', date: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current News Items</h4>
      <ul className="admin-list">
        {newsItems.map(item => (
          <li key={item.id} className="admin-list-item">
            <span>{item.title} - {item.date}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditNews(item)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDeleteNews(item.id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <hr style={{margin: '3rem 0', borderColor: 'var(--muted-color)'}} />

      {/* Notifications Section */}
      <h4>Manage Notifications</h4>
      <div className="form-group">
        <label htmlFor="notificationTitle">Title</label>
        <input type="text" id="notificationTitle" name="title" value={currentNotification.title} onChange={handleNotificationChange} />
      </div>
      <div className="form-group">
        <label htmlFor="notificationDescription">Description</label>
        <textarea id="notificationDescription" name="description" value={currentNotification.description} onChange={handleNotificationChange}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="notificationDate">Date</label>
        <input type="date" id="notificationDate" name="date" value={currentNotification.date} onChange={handleNotificationChange} />
      </div>
      <div className="form-actions">
        <button onClick={handleAddNotification} className="save-btn">{editingNotificationId ? 'Save Changes' : 'Add Notification'}</button>
        {editingNotificationId && <button onClick={() => {setEditingNotificationId(null); setCurrentNotification({ id: '', title: '', description: '', date: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Notifications</h4>
      <ul className="admin-list">
        {notifications.map(item => (
          <li key={item.id} className="admin-list-item">
            <span>{item.title} - {item.date}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditNotification(item)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDeleteNotification(item.id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NoticeBoardEditor;
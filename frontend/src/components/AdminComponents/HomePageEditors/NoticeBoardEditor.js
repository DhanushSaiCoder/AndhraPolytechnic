import React, { useState, useEffect } from 'react';
import newsService from '../../../services/newsService';
import notificationService from '../../../services/notificationService';

const NoticeBoardEditor = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [currentNewsItem, setCurrentNewsItem] = useState({
    _id: '', // Changed to _id
    title: '',
    description: '',
    date: '',
  });
  const [currentNotification, setCurrentNotification] = useState({
    _id: '', // Changed to _id
    title: '',
    description: '',
    date: '',
  });

  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editingNotificationId, setEditingNotificationId] = useState(null);

  const fetchNewsItems = async () => {
    try {
      const response = await newsService.getNewsItems();
      const formattedNews = response.data.map(item => ({
        ...item,
        date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
      }));
      setNewsItems(formattedNews);
    } catch (error) {
      console.error('Error fetching news items:', error);
      alert('Failed to fetch news items.');
    }
  };

  const fetchNotificationItems = async () => {
    try {
      const response = await notificationService.getNotificationItems();
      const formattedNotifications = response.data.map(item => ({
        ...item,
        date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
      }));
      setNotifications(formattedNotifications);
    } catch (error) {
      console.error('Error fetching notification items:', error);
      alert('Failed to fetch notification items.');
    }
  };

  useEffect(() => {
    fetchNewsItems();
    fetchNotificationItems();
  }, []);

  const handleNewsChange = (e) => {
    const { name, value } = e.target;
    setCurrentNewsItem(prevState => ({ ...prevState, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, value } = e.target;
    setCurrentNotification(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddNews = async () => {
    if (currentNewsItem.title.trim() === '') return;
    try {
      if (editingNewsId) {
        await newsService.updateNewsItem(editingNewsId, currentNewsItem);
        alert('News item updated successfully!');
      } else {
        await newsService.createNewsItem(currentNewsItem);
        alert('News item added successfully!');
      }
      fetchNewsItems(); // Re-fetch news items
      setCurrentNewsItem({ _id: '', title: '', description: '', date: '' });
      setEditingNewsId(null);
    } catch (error) {
      console.error('Error saving news item:', error);
      alert('Failed to save news item.');
    }
  };

  const handleAddNotification = async () => {
    if (currentNotification.title.trim() === '') return;
    try {
      if (editingNotificationId) {
        await notificationService.updateNotificationItem(editingNotificationId, currentNotification);
        alert('Notification updated successfully!');
      } else {
        await notificationService.createNotificationItem(currentNotification);
        alert('Notification added successfully!');
      }
      fetchNotificationItems(); // Re-fetch notifications
      setCurrentNotification({ _id: '', title: '', description: '', date: '' });
      setEditingNotificationId(null);
    } catch (error) {
      console.error('Error saving notification:', error);
      alert('Failed to save notification.');
    }
  };

  const handleEditNews = (item) => {
    setCurrentNewsItem({
      ...item,
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
    });
    setEditingNewsId(item._id);
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await newsService.deleteNewsItem(id);
        alert('News item deleted successfully!');
        fetchNewsItems();
      } catch (error) {
        console.error('Error deleting news item:', error);
        alert('Failed to delete news item.');
      }
    }
  };

  const handleEditNotification = (item) => {
    setCurrentNotification({
      ...item,
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
    });
    setEditingNotificationId(item._id);
  };

  const handleDeleteNotification = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await notificationService.deleteNotificationItem(id);
        alert('Notification deleted successfully!');
        fetchNotificationItems();
      } catch (error) {
        console.error('Error deleting notification:', error);
        alert('Failed to delete notification.');
      }
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
          <li key={item._id} className="admin-list-item">
            <span>{item.title} - {item.date}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditNews(item)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDeleteNews(item._id)} className="action-btn delete-btn">Delete</button>
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
          <li key={item._id} className="admin-list-item">
            <span>{item.title} - {item.date}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditNotification(item)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDeleteNotification(item._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NoticeBoardEditor;
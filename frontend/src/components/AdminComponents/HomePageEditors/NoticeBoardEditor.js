import React, { useState, useEffect } from 'react';
import newsService from '../../../services/newsService';
import notificationService from '../../../services/notificationService';
import NewsItemModal from './NewsItemModal'; // Import the new News modal
import NotificationItemModal from './NotificationItemModal'; // Import the new Notification modal

const NoticeBoardEditor = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNewsItem, setEditingNewsItem] = useState(null);

  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [editingNotificationItem, setEditingNotificationItem] = useState(null);

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

  // News Handlers
  const handleAddNewsClick = () => {
    setEditingNewsItem({ _id: '', title: '', description: '', date: '' });
    setIsNewsModalOpen(true);
  };

  const handleEditNewsClick = (item) => {
    setEditingNewsItem({
      ...item,
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
    });
    setIsNewsModalOpen(true);
  };

  const handleSaveNewsItem = async (newsItemData) => {
    try {
      if (newsItemData._id) {
        await newsService.updateNewsItem(newsItemData._id, newsItemData);
        alert('News item updated successfully!');
      } else {
        const { _id, ...rest } = newsItemData;
        await newsService.createNewsItem(rest);
        alert('News item added successfully!');
      }
      fetchNewsItems();
      setIsNewsModalOpen(false);
      setEditingNewsItem(null);
    } catch (error) {
      console.error('Error saving news item:', error);
      alert('Failed to save news item.');
    }
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

  // Notification Handlers
  const handleAddNotificationClick = () => {
    setEditingNotificationItem({ _id: '', title: '', description: '', date: '' });
    setIsNotificationModalOpen(true);
  };

  const handleEditNotificationClick = (item) => {
    setEditingNotificationItem({
      ...item,
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
    });
    setIsNotificationModalOpen(true);
  };

  const handleSaveNotificationItem = async (notificationItemData) => {
    try {
      if (notificationItemData._id) {
        await notificationService.updateNotificationItem(notificationItemData._id, notificationItemData);
        alert('Notification updated successfully!');
      } else {
        const { _id, ...rest } = notificationItemData;
        await notificationService.createNotificationItem(rest);
        alert('Notification added successfully!');
      }
      fetchNotificationItems();
      setIsNotificationModalOpen(false);
      setEditingNotificationItem(null);
    } catch (error) {
      console.error('Error saving notification:', error);
      alert('Failed to save notification.');
    }
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
      <div className="form-actions">
        <button onClick={handleAddNewsClick} className="save-btn">Add New News</button>
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current News Items</h4>
      <ul className="admin-list">
        {newsItems.map(item => (
          <li key={item._id} className="admin-list-item">
            <span>{item.title} - {item.date}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditNewsClick(item)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDeleteNews(item._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <hr style={{margin: '3rem 0', borderColor: 'var(--muted-color)'}} />

      {/* Notifications Section */}
      <h4>Manage Notifications</h4>
      <div className="form-actions">
        <button onClick={handleAddNotificationClick} className="save-btn">Add New Notification</button>
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Notifications</h4>
      <ul className="admin-list">
        {notifications.map(item => (
          <li key={item._id} className="admin-list-item">
            <span>{item.title} - {item.date}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditNotificationClick(item)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDeleteNotification(item._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingNewsItem && (
        <NewsItemModal
          isOpen={isNewsModalOpen}
          onClose={() => setIsNewsModalOpen(false)}
          onSave={handleSaveNewsItem}
          newsItem={editingNewsItem}
        />
      )}

      {editingNotificationItem && (
        <NotificationItemModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
          onSave={handleSaveNotificationItem}
          notificationItem={editingNotificationItem}
        />
      )}
    </section>
  );
};

export default NoticeBoardEditor;

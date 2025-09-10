import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const NotificationItemModal = ({ isOpen, onClose, onSave, notificationItem }) => {
  const [currentNotification, setCurrentNotification] = useState(notificationItem);

  useEffect(() => {
    setCurrentNotification(notificationItem);
  }, [notificationItem]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNotification(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (currentNotification.title.trim() === '') {
      alert('Title is required!');
      return;
    }
    onSave(currentNotification);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentNotification._id ? 'Edit Notification Item' : 'Add Notification Item'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="notificationTitle">Title</label>
            <input type="text" id="notificationTitle" name="title" value={currentNotification.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="notificationDescription">Description</label>
            <textarea id="notificationDescription" name="description" value={currentNotification.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="notificationDate">Date</label>
            <input type="date" id="notificationDate" name="date" value={currentNotification.date} onChange={handleChange} />
          </div>
        </div>
        <div className="editor-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItemModal;

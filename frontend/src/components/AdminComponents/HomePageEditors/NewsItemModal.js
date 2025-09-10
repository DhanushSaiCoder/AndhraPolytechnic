import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const NewsItemModal = ({ isOpen, onClose, onSave, newsItem }) => {
  const [currentNewsItem, setCurrentNewsItem] = useState(newsItem);

  useEffect(() => {
    setCurrentNewsItem(newsItem);
  }, [newsItem]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNewsItem(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (currentNewsItem.title.trim() === '') {
      alert('Title is required!');
      return;
    }
    onSave(currentNewsItem);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentNewsItem._id ? 'Edit News Item' : 'Add News Item'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="newsTitle">Title</label>
            <input type="text" id="newsTitle" name="title" value={currentNewsItem.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="newsDescription">Description</label>
            <textarea id="newsDescription" name="description" value={currentNewsItem.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="newsDate">Date</label>
            <input type="date" id="newsDate" name="date" value={currentNewsItem.date} onChange={handleChange} />
          </div>
        </div>
        <div className="editor-modal-footer">
          <button className="se-btn" onClick={onClose}>Cancel</button>
          <button className="se-btn se-btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default NewsItemModal;

import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const EventModal = ({ isOpen, onClose, onSave, event }) => {
  const [currentEvent, setCurrentEvent] = useState(event);

  useEffect(() => {
    setCurrentEvent(event);
  }, [event]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (currentEvent.title.trim() === '') {
      alert('Title is required!');
      return;
    }
    onSave(currentEvent);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentEvent._id ? 'Edit Event' : 'Add Event'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
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
        </div>
        <div className="editor-modal-footer">
          <button className="se-btn" onClick={onClose}>Cancel</button>
          <button className="se-btn se-btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;

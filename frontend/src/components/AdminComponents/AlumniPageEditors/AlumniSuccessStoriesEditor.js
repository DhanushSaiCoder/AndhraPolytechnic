import React, { useState, useEffect } from 'react';
import alumniSuccessStoryService from '../../../services/alumniSuccessStoryService';

const initialStoryState = {
  _id: '',
  name: '',
  year: '',
  field: '',
  company: '',
  position: '',
  story: '',
  image: '',
};

const AlumniSuccessStoriesEditor = () => {
  const [stories, setStories] = useState([]);
  const [currentStory, setCurrentStory] = useState({ ...initialStoryState });
  const [editingId, setEditingId] = useState(null);

  const fetchStories = async () => {
    try {
      const response = await alumniSuccessStoryService.getAlumniSuccessStories();
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching alumni success stories:', error);
      alert('Failed to fetch alumni success stories.');
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStory(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    if (currentStory.name.trim() === '') return;
    try {
      if (editingId) {
        await alumniSuccessStoryService.updateAlumniSuccessStory(editingId, currentStory);
        alert('Story updated successfully!');
      } else {
        const { _id, ...rest } = currentStory;
        await alumniSuccessStoryService.createAlumniSuccessStory(rest);
        alert('Story added successfully!');
      }
      fetchStories();
      setCurrentStory({ ...initialStoryState });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving story:', error);
      alert('Failed to save story.');
    }
  };

  const handleEdit = (story) => {
    setCurrentStory({ ...initialStoryState, ...story });
    setEditingId(story._id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await alumniSuccessStoryService.deleteAlumniSuccessStory(id);
        alert('Story deleted successfully!');
        fetchStories();
      } catch (error) {
        console.error('Error deleting story:', error);
        alert('Failed to delete story.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>Alumni Success Stories</h3>

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={currentStory.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Year</label>
        <input type="text" name="year" value={currentStory.year} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Branch</label>
        <input type="text" name="field" value={currentStory.field} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Company</label>
        <input type="text" name="company" value={currentStory.company} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Position</label>
        <input type="text" name="position" value={currentStory.position} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Story</label>
        <textarea name="story" value={currentStory.story} onChange={handleChange}></textarea>
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input type="text" name="image" value={currentStory.image} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button onClick={handleSave} className="save-btn">{editingId ? 'Save Changes' : 'Add Story'}</button>
        {editingId && <button onClick={() => { setEditingId(null); setCurrentStory({ ...initialStoryState }); }} className="cancel-btn">Cancel Edit</button>}
      </div>

      <hr style={{ margin: '3rem 0' }} />

      <ul className="admin-list">
        {stories.map(item => (
          <li key={item._id} className="admin-list-item">
            <span>{item.name}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(item)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AlumniSuccessStoriesEditor;

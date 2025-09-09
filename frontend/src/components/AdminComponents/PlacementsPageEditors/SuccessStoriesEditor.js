import React, { useState, useEffect } from 'react';
import successStoryService from '../../../services/successStoryService';

const SuccessStoriesEditor = () => {
  const [stories, setStories] = useState([]);
  const [currentStory, setCurrentStory] = useState({
    _id: '',
    name: '',
    company: '',
    role: '',
    quote: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchStories = async () => {
    try {
      const response = await successStoryService.getSuccessStories();
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching success stories:', error);
      alert('Failed to fetch success stories.');
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStory(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddStory = async () => {
    if (currentStory.name.trim() === '' || currentStory.quote.trim() === '') return;
    try {
      if (editingId) {
        await successStoryService.updateSuccessStory(editingId, currentStory);
        alert('Success Story updated successfully!');
      } else {
        await successStoryService.createSuccessStory(currentStory);
        alert('Success Story added successfully!');
      }
      fetchStories(); // Re-fetch stories
      setCurrentStory({ _id: '', name: '', company: '', role: '', quote: '', image: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving success story:', error);
      alert('Failed to save success story.');
    }
  };

  const handleEdit = (story) => {
    setCurrentStory(story);
    setEditingId(story._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this success story?')) {
      try {
        await successStoryService.deleteSuccessStory(id);
        alert('Success Story deleted successfully!');
        fetchStories();
      } catch (error) {
        console.error('Error deleting success story:', error);
        alert('Failed to delete success story.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>Success Stories Content</h3>

      <div className="form-group">
        <label htmlFor="name">Student Name</label>
        <input type="text" id="name" name="name" value={currentStory.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" value={currentStory.company} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input type="text" id="role" name="role" value={currentStory.role} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="quote">Quote</label>
        <textarea id="quote" name="quote" value={currentStory.quote} onChange={handleChange}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input type="text" id="image" name="image" value={currentStory.image} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button onClick={handleAddStory} className="save-btn">{editingId ? 'Save Changes' : 'Add Story'}</button>
        {editingId && <button onClick={() => {setEditingId(null); setCurrentStory({ _id: '', name: '', company: '', role: '', quote: '', image: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Success Stories</h4>
      <ul className="admin-list">
        {stories.map(story => (
          <li key={story._id} className="admin-list-item">
            <span>{story.name} - {story.company}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(story)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(story._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SuccessStoriesEditor;
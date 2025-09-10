import React, { useState, useEffect } from 'react';
import alumniSuccessStoryService from '../../../services/alumniSuccessStoryService';
import AlumniSuccessStoryModal from './AlumniSuccessStoryModal'; // Import the new modal

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null);

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

  const handleAddClick = () => {
    setEditingStory({ ...initialStoryState });
    setIsModalOpen(true);
  };

  const handleEditClick = (story) => {
    setEditingStory({ ...initialStoryState, ...story });
    setIsModalOpen(true);
  };

  const handleSaveStory = async (storyData) => {
    try {
      if (storyData._id) {
        await alumniSuccessStoryService.updateAlumniSuccessStory(storyData._id, storyData);
        alert('Story updated successfully!');
      } else {
        const { _id, ...rest } = storyData;
        await alumniSuccessStoryService.createAlumniSuccessStory(rest);
        alert('Story added successfully!');
      }
      fetchStories();
      setIsModalOpen(false);
      setEditingStory(null);
    } catch (error) {
      console.error('Error saving story:', error);
      alert('Failed to save story.');
    }
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

      <div className="form-actions">
        <button onClick={handleAddClick} className="save-btn">Add New Story</button>
      </div>

      <hr style={{ margin: '3rem 0' }} />

      <ul className="admin-list">
        {stories.map(item => (
          <li key={item._id} className="admin-list-item">
            <span>{item.name}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditClick(item)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingStory && (
        <AlumniSuccessStoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveStory}
          story={editingStory}
        />
      )}
    </section>
  );
};

export default AlumniSuccessStoriesEditor;

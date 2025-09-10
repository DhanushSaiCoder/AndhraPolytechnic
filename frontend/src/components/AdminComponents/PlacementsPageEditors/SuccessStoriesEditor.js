import React, { useState, useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import successStoryService from '../../../services/successStoryService';
import SuccessStoryModal from './SuccessStoryModal';

const initialStoryState = {
  _id: '',
  name: '',
  company: '',
  role: '',
  quote: '',
  image: '',
};

const SuccessStoriesEditor = () => {
  const [stories, setStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null);

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

  const handleAddClick = () => {
    setEditingStory({ ...initialStoryState });
    setIsModalOpen(true);
  };

  const handleEditClick = (story) => {
    setEditingStory(story);
    setIsModalOpen(true);
  };

  const handleSaveStory = async (storyData) => {
    try {
      if (storyData._id) {
        await successStoryService.updateSuccessStory(storyData._id, storyData);
        alert('Success Story updated successfully!');
      } else {
        await successStoryService.createSuccessStory(storyData);
        alert('Success Story added successfully!');
      }
      fetchStories();
      setIsModalOpen(false);
      setEditingStory(null);
    } catch (error) {
      console.error('Error saving success story:', error);
      alert('Failed to save success story.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
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
      <div className="admin-section-header">
        <h3>Success Stories Content</h3>
        <button onClick={handleAddClick} className="btn btn-primary">Add New Story</button>
      </div>

      <ul className="admin-simple-list">
        {stories.map(story => (
          <li key={story._id} className="admin-simple-list-item">
            <span>{story.name} - {story.company}</span>
            <div className="admin-list-item-actions">
              <button onClick={() => handleEditClick(story)} className="btn-icon" title="Edit"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(story._id)} className="btn-icon btn-danger" title="Delete"><Trash2 size={18} /></button>
            </div>
          </li>
        ))}
      </ul>

      {editingStory && (
        <SuccessStoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveStory}
          story={editingStory}
        />
      )}
    </section>
  );
};

export default SuccessStoriesEditor;

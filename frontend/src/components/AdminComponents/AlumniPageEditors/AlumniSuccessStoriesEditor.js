import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import alumniSuccessStoryService from '../../../services/alumniSuccessStoryService';
import AlumniSuccessStoryModal from './AlumniSuccessStoryModal';
import Loader from '../../Loader';

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchStories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await alumniSuccessStoryService.getAlumniSuccessStories();
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching alumni success stories:', error);
      alert('Failed to fetch alumni success stories.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

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

  if (isLoading) {
    return <Loader text="Loading Success Stories..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>Alumni Success Stories</h3>
        <button onClick={handleAddClick} className="btn btn-primary">Add New Story</button>
      </div>

      <ul className="admin-simple-list">
        {stories.map(item => (
          <li key={item._id} className="admin-simple-list-item">
            <span>{item.name}</span>
            <div className="admin-list-item-actions">
              <button onClick={() => handleEditClick(item)} className="btn-icon" title="Edit">
                <Edit2 size={18} />
              </button>
              <button onClick={() => handleDelete(item._id)} className="btn-icon btn-danger" title="Delete">
                <Trash2 size={18} />
              </button>
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

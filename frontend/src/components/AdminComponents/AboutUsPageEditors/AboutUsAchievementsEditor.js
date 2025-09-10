import React, { useState, useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import aboutUsAchievementService from '../../../services/aboutUsAchievementService';
import AboutUsAchievementModal from './AboutUsAchievementModal';

const initialAchievementState = {
  _id: '',
  title: '',
  subtitle: '',
  image: '',
};

const AboutUsAchievementsEditor = () => {
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);

  const fetchAchievements = async () => {
    try {
      const response = await aboutUsAchievementService.getAchievements();
      setAchievements(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      alert('Failed to fetch achievements.');
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleAddClick = () => {
    setEditingAchievement({ ...initialAchievementState });
    setIsModalOpen(true);
  };

  const handleEditClick = (achievement) => {
    setEditingAchievement({ ...initialAchievementState, ...achievement });
    setIsModalOpen(true);
  };

  const handleSaveAchievement = async (achievementData) => {
    try {
      if (achievementData._id) {
        await aboutUsAchievementService.updateAchievement(achievementData._id, achievementData);
        alert('Achievement updated successfully!');
      } else {
        const { _id, ...rest } = achievementData;
        await aboutUsAchievementService.createAchievement(rest);
        alert('Achievement added successfully!');
      }
      fetchAchievements();
      setIsModalOpen(false);
      setEditingAchievement(null);
    } catch (error) {
      console.error('Error saving achievement:', error);
      alert('Failed to save achievement.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await aboutUsAchievementService.deleteAchievement(id);
        alert('Achievement deleted successfully!');
        fetchAchievements();
      } catch (error) {
        console.error('Error deleting achievement:', error);
        alert('Failed to delete achievement.');
      }
    }
  };

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>About Us Achievements</h3>
        <button onClick={handleAddClick} className="btn btn-primary">Add New Achievement</button>
      </div>

      <ul className="admin-list">
        {achievements.map(item => (
          <li key={item._id} className="admin-list-item">
            <div className="admin-list-item-content">
              <h5 className="item-title">{item.title}</h5>
              <p className="item-subtitle">{item.subtitle}</p>
            </div>
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

      {editingAchievement && (
        <AboutUsAchievementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveAchievement}
          achievement={editingAchievement}
        />
      )}
    </section>
  );
};

export default AboutUsAchievementsEditor;

import React, { useState, useEffect } from 'react';
import academicAchievementService from '../../../services/academicAchievementService';
import AcademicAchievementModal from './AcademicAchievementModal'; // Import the new modal

const initialAchievementState = {
  _id: '',
  title: '',
  description: '',
  images: [],
  category: 'student', // 'student' or 'faculty'
};

const AcademicAchievementsEditor = () => {
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);

  const fetchAchievements = async () => {
    try {
      const response = await academicAchievementService.getAcademicAchievements();
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
        await academicAchievementService.updateAcademicAchievement(achievementData._id, achievementData);
        alert('Achievement updated successfully!');
      } else {
        const { _id, ...rest } = achievementData;
        await academicAchievementService.createAcademicAchievement(rest);
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
        await academicAchievementService.deleteAcademicAchievement(id);
        alert('Achievement deleted successfully!');
        fetchAchievements();
      } catch (error) {
        console.error('Error deleting achievement:', error);
        alert('Failed to delete achievement.');
      }
    }
  };

  const renderList = (category) => (
    <div className="category-section">
      <h4 style={{ textTransform: 'capitalize' }}>{category} Achievements</h4>
      <ul className="admin-list">
        {achievements.filter(ach => ach.category === category).map(item => (
          <li key={item._id} className="admin-list-item">
            <span>{item.title}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditClick(item)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="admin-section">
      <h3>Academic Achievements Content</h3>

      <div className="form-actions">
        <button onClick={handleAddClick} className="save-btn">Add New Achievement</button>
      </div>

      <hr style={{ margin: '3rem 0' }} />

      {renderList('student')}
      {renderList('faculty')}

      {editingAchievement && (
        <AcademicAchievementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveAchievement}
          achievement={editingAchievement}
        />
      )}
    </section>
  );
};

export default AcademicAchievementsEditor;

import React, { useState, useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import academicAchievementService from '../../../services/academicAchievementService';
import AcademicAchievementModal from './AcademicAchievementModal';

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
      <h4>{category} Achievements</h4>
      <ul className="admin-simple-list">
        {achievements.filter(ach => ach.category === category).map(item => (
          <li key={item._id} className="admin-simple-list-item">
            <span>{item.title}</span>
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
    </div>
  );

  return (
    <section className="admin-section">
       <div className="admin-section-header">
        <h3>Academic Achievements Content</h3>
        <button onClick={handleAddClick} className="btn btn-primary">Add New Achievement</button>
      </div>

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

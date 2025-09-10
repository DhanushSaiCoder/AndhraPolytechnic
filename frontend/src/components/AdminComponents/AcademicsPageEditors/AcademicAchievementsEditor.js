import React, { useState, useEffect } from 'react';
import academicAchievementService from '../../../services/academicAchievementService';

const initialAchievementState = {
  _id: '',
  title: '',
  description: '',
  images: [],
  category: 'student', // 'student' or 'faculty'
};

const AcademicAchievementsEditor = () => {
  const [achievements, setAchievements] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState({ ...initialAchievementState });
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAchievement(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...currentAchievement.images];
    updatedImages[index] = value;
    setCurrentAchievement(prevState => ({ ...prevState, images: updatedImages }));
  };

  const handleAddImage = () => {
    setCurrentAchievement(prevState => ({ ...prevState, images: [...prevState.images, ''] }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = currentAchievement.images.filter((_, i) => i !== index);
    setCurrentAchievement(prevState => ({ ...prevState, images: updatedImages }));
  };

  const handleSave = async () => {
    if (currentAchievement.title.trim() === '') return;
    try {
      const achievementData = {
        ...currentAchievement,
        images: currentAchievement.images.filter(img => img.trim() !== ''),
      };

      if (editingId) {
        await academicAchievementService.updateAcademicAchievement(editingId, achievementData);
        alert('Achievement updated successfully!');
      } else {
        const { _id, ...rest } = achievementData;
        await academicAchievementService.createAcademicAchievement(rest);
        alert('Achievement added successfully!');
      }
      fetchAchievements();
      setCurrentAchievement({ ...initialAchievementState });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving achievement:', error);
      alert('Failed to save achievement.');
    }
  };

  const handleEdit = (achievement) => {
    setCurrentAchievement({ ...initialAchievementState, ...achievement });
    setEditingId(achievement._id);
    window.scrollTo(0, 0);
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
              <button onClick={() => handleEdit(item)} className="action-btn edit-btn">Edit</button>
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

      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" value={currentAchievement.title} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={currentAchievement.description} onChange={handleChange}></textarea>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select name="category" value={currentAchievement.category} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
      </div>

      <div className="form-section">
        <h4>Images</h4>
        {currentAchievement.images.map((image, index) => (
          <div key={index} className="dynamic-list-item">
            <input
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="Image URL"
            />
            <button type="button" onClick={() => handleRemoveImage(index)} className="remove-btn">Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddImage} className="add-btn">Add Image</button>
      </div>

      <div className="form-actions">
        <button onClick={handleSave} className="save-btn">{editingId ? 'Save Changes' : 'Add Achievement'}</button>
        {editingId && <button onClick={() => { setEditingId(null); setCurrentAchievement({ ...initialAchievementState }); }} className="cancel-btn">Cancel Edit</button>}
      </div>

      <hr style={{ margin: '3rem 0' }} />

      {renderList('student')}
      {renderList('faculty')}
    </section>
  );
};

export default AcademicAchievementsEditor;

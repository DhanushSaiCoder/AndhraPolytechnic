import React, { useState, useEffect } from 'react';
import aboutUsAchievementService from '../../../services/aboutUsAchievementService';

const initialAchievementState = {
  _id: '',
  title: '',
  subtitle: '',
  image: '',
};

const AboutUsAchievementsEditor = () => {
  const [achievements, setAchievements] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState({ ...initialAchievementState });
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAchievement(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    if (currentAchievement.title.trim() === '') return;
    try {
      if (editingId) {
        await aboutUsAchievementService.updateAchievement(editingId, currentAchievement);
        alert('Achievement updated successfully!');
      } else {
        const { _id, ...rest } = currentAchievement;
        await aboutUsAchievementService.createAchievement(rest);
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
      <h3>About Us Achievements</h3>

      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" value={currentAchievement.title} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Subtitle</label>
        <input type="text" name="subtitle" value={currentAchievement.subtitle} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input type="text" name="image" value={currentAchievement.image} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button onClick={handleSave} className="save-btn">{editingId ? 'Save Changes' : 'Add Achievement'}</button>
        {editingId && <button onClick={() => { setEditingId(null); setCurrentAchievement({ ...initialAchievementState }); }} className="cancel-btn">Cancel Edit</button>}
      </div>

      <hr style={{ margin: '3rem 0' }} />

      <ul className="admin-list">
        {achievements.map(item => (
          <li key={item._id} className="admin-list-item">
            <span>{item.title}</span>
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

export default AboutUsAchievementsEditor;

import React, { useState, useEffect } from 'react';
import placementStatService from '../../../services/placementStatService';

const PlacementStatsEditor = () => {
  const [stats, setStats] = useState([]);
  const [currentStat, setCurrentStat] = useState({
    _id: '',
    icon: '', // e.g., 'Users', 'Briefcase', 'DollarSign'
    value: '',
    label: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await placementStatService.getPlacementStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching placement stats:', error);
      alert('Failed to fetch placement stats.');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStat(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddStat = async () => {
    if (currentStat.value.trim() === '' || currentStat.label.trim() === '') return;
    try {
      if (editingId) {
        await placementStatService.updatePlacementStat(editingId, currentStat);
        alert('Placement Stat updated successfully!');
      } else {
        await placementStatService.createPlacementStat(currentStat);
        alert('Placement Stat added successfully!');
      }
      fetchStats(); // Re-fetch stats
      setCurrentStat({ _id: '', icon: '', value: '', label: '', description: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving placement stat:', error);
      alert('Failed to save placement stat.');
    }
  };

  const handleEdit = (stat) => {
    setCurrentStat(stat);
    setEditingId(stat._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      try {
        await placementStatService.deletePlacementStat(id);
        alert('Placement Stat deleted successfully!');
        fetchStats();
      } catch (error) {
        console.error('Error deleting placement stat:', error);
        alert('Failed to delete placement stat.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>Placement Stats Content</h3>

      <div className="form-group">
        <label htmlFor="statIcon">Icon Name (e.g., Users, Briefcase, DollarSign)</label>
        <input type="text" id="statIcon" name="icon" value={currentStat.icon} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="statValue">Value</label>
        <input type="text" id="statValue" name="value" value={currentStat.value} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="statLabel">Label</label>
        <input type="text" id="statLabel" name="label" value={currentStat.label} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="statDescription">Description</label>
        <textarea id="statDescription" name="description" value={currentStat.description} onChange={handleChange}></textarea>
      </div>
      <div className="form-actions">
        <button onClick={handleAddStat} className="save-btn">{editingId ? 'Save Changes' : 'Add Stat'}</button>
        {editingId && <button onClick={() => {setEditingId(null); setCurrentStat({ _id: '', icon: '', value: '', label: '', description: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Placement Stats</h4>
      <ul className="admin-list">
        {stats.map(stat => (
          <li key={stat._id} className="admin-list-item">
            <span>{stat.label}: {stat.value}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(stat)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(stat._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlacementStatsEditor;
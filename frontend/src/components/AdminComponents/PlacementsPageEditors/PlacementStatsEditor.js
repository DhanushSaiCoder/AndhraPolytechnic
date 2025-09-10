import React, { useState, useEffect } from 'react';
import placementStatService from '../../../services/placementStatService';
import PlacementStatModal from './PlacementStatModal'; // Import the new modal

const PlacementStatsEditor = () => {
  const [stats, setStats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);

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

  const handleAddClick = () => {
    setEditingStat({ _id: '', icon: '', value: '', label: '', description: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (stat) => {
    setEditingStat(stat);
    setIsModalOpen(true);
  };

  const handleSaveStat = async (statData) => {
    try {
      if (statData._id) {
        await placementStatService.updatePlacementStat(statData._id, statData);
        alert('Placement Stat updated successfully!');
      } else {
        await placementStatService.createPlacementStat(statData);
        alert('Placement Stat added successfully!');
      }
      fetchStats();
      setIsModalOpen(false);
      setEditingStat(null);
    } catch (error) {
      console.error('Error saving placement stat:', error);
      alert('Failed to save placement stat.');
    }
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

      <div className="form-actions">
        <button onClick={handleAddClick} className="save-btn">Add New Stat</button>
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Placement Stats</h4>
      <ul className="admin-list">
        {stats.map(stat => (
          <li key={stat._id} className="admin-list-item">
            <span>{stat.label}: {stat.value}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditClick(stat)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(stat._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingStat && (
        <PlacementStatModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveStat}
          stat={editingStat}
        />
      )}
    </section>
  );
};

export default PlacementStatsEditor;

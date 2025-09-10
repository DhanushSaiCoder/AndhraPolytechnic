import React, { useState, useEffect } from 'react';
import statService from '../../../services/statService'; // Import the service
import CurrentInfoModal from './CurrentInfoModal'; // Import the new modal

const CurrentInfoEditor = () => {
  const [stats, setStats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await statService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      alert('Failed to fetch stats.');
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
        await statService.updateStat(statData._id, statData);
        alert('Stat updated successfully!');
      } else {
        await statService.createStat(statData);
        alert('Stat added successfully!');
      }
      fetchStats(); // Re-fetch stats
      setIsModalOpen(false);
      setEditingStat(null);
    } catch (error) {
      console.error('Error saving stat:', error);
      alert('Failed to save stat.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      try {
        await statService.deleteStat(id);
        alert('Stat deleted successfully!');
        fetchStats();
      } catch (error) {
        console.error('Error deleting stat:', error);
        alert('Failed to delete stat.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>Current Info (Stats) Content</h3>

      <div className="form-actions">
        <button onClick={handleAddClick} className="save-btn">Add New Stat</button>
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Stats</h4>
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
        <CurrentInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveStat}
          stat={editingStat}
        />
      )}
    </section>
  );
};

export default CurrentInfoEditor;

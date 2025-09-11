import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import statService from '../../../services/statService';
import CurrentInfoModal from './CurrentInfoModal';
import Loader from '../../Loader';

const CurrentInfoEditor = () => {
  const [stats, setStats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await statService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      alert('Failed to fetch stats.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

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
      fetchStats();
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

  if (isLoading) {
    return <Loader text="Loading Stats..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>Current Info (Stats) Content</h3>
        <button onClick={handleAddClick} className="btn btn-primary">Add New Stat</button>
      </div>

      <ul className="admin-simple-list">
        {stats.map(stat => (
          <li key={stat._id} className="admin-simple-list-item">
            <span>{stat.label}: {stat.value}</span>
            <div className="admin-list-item-actions">
              <button onClick={() => handleEditClick(stat)} className="btn-icon" title="Edit"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(stat._id)} className="btn-icon btn-danger" title="Delete"><Trash2 size={18} /></button>
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

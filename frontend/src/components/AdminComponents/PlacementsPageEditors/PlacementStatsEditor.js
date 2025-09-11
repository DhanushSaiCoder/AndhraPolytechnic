import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import placementStatService from '../../../services/placementStatService';
import PlacementStatModal from './PlacementStatModal';
import Loader from '../../Loader';

const PlacementStatsEditor = () => {
  const [stats, setStats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await placementStatService.getPlacementStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching placement stats:', error);
      alert('Failed to fetch placement stats.');
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

  if (isLoading) {
    return <Loader text="Loading Placement Stats..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>Placement Stats Content</h3>
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

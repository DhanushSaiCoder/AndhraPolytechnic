import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import updateService from '../../../services/updateService';
import UpdateModal from './UpdateModal';
import Loader from '../../Loader';

const UpdatesMarqueeEditor = () => {
  const [updates, setUpdates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUpdates = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await updateService.getUpdates();
      const formattedUpdates = response.data.map(update => ({
        ...update,
        date: update.date ? new Date(update.date).toISOString().split('T')[0] : '',
      }));
      setUpdates(formattedUpdates);
    } catch (error) {
      console.error('Error fetching updates:', error);
      alert('Failed to fetch updates.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUpdates();
  }, [fetchUpdates]);

  const handleAddClick = () => {
    setEditingUpdate({
      _id: '',
      titleEn: '',
      severity: 'info',
      date: '',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (update) => {
    setEditingUpdate({
      ...update,
      date: update.date ? new Date(update.date).toISOString().split('T')[0] : '',
    });
    setIsModalOpen(true);
  };

  const handleSaveUpdate = async (updateData) => {
    try {
      if (updateData._id) {
        await updateService.updateUpdate(updateData._id, updateData);
        alert('Update updated successfully!');
      } else {
        await updateService.createUpdate(updateData);
        alert('Update added successfully!');
      }
      fetchUpdates();
      setIsModalOpen(false);
      setEditingUpdate(null);
    } catch (error) {
      console.error('Error saving update:', error);
      alert('Failed to save update.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      try {
        await updateService.deleteUpdate(id);
        alert('Update deleted successfully!');
        fetchUpdates();
      } catch (error) {
        console.error('Error deleting update:', error);
        alert('Failed to delete update.');
      }
    }
  };

  if (isLoading) {
    return <Loader text="Loading Updates..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>Updates Marquee Content</h3>
        <button onClick={handleAddClick} className="btn btn-primary">Add New Update</button>
      </div>

      <ul className="admin-simple-list">
        {updates.map(update => (
          <li key={update._id} className="admin-simple-list-item">
            <span>{update.titleEn} ({update.severity}) - {update.date}</span>
            <div className="admin-list-item-actions">
              <button onClick={() => handleEditClick(update)} className="btn-icon" title="Edit"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(update._id)} className="btn-icon btn-danger" title="Delete"><Trash2 size={18} /></button>
            </div>
          </li>
        ))}
      </ul>

      {editingUpdate && (
        <UpdateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUpdate}
          update={editingUpdate}
        />
      )}
    </section>
  );
};

export default UpdatesMarqueeEditor;

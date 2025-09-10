import React, { useState, useEffect } from 'react';
import updateService from '../../../services/updateService'; // Import the service
import UpdateModal from './UpdateModal'; // Import the new modal

const UpdatesMarqueeEditor = () => {
  const [updates, setUpdates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);

  const fetchUpdates = async () => {
    try {
      const response = await updateService.getUpdates();
      // Format date for input type="date"
      const formattedUpdates = response.data.map(update => ({
        ...update,
        date: update.date ? new Date(update.date).toISOString().split('T')[0] : '',
      }));
      setUpdates(formattedUpdates);
    } catch (error) {
      console.error('Error fetching updates:', error);
      alert('Failed to fetch updates.');
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

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
    // Ensure date is formatted for input type="date"
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
      fetchUpdates(); // Re-fetch updates to get the latest data from backend
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
        fetchUpdates(); // Re-fetch updates
      } catch (error) {
        console.error('Error deleting update:', error);
        alert('Failed to delete update.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>Updates Marquee Content</h3>

      <div className="form-actions">
        <button onClick={handleAddClick} className="save-btn">Add New Update</button>
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Updates</h4>
      <ul className="admin-list">
        {updates.map(update => (
          <li key={update._id} className="admin-list-item">
            <span>{update.titleEn} ({update.severity}) - {update.date}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditClick(update)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(update._id)} className="action-btn delete-btn">Delete</button>
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

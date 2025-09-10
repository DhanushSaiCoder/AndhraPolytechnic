import React, { useState, useEffect } from 'react';
import recruiterService from '../../../services/recruiterService';
import RecruiterModal from './RecruiterModal'; // Import the new modal

const TopRecruitersEditor = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecruiter, setEditingRecruiter] = useState(null);

  const fetchRecruiters = async () => {
    try {
      const response = await recruiterService.getRecruiters();
      setRecruiters(response.data);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      alert('Failed to fetch recruiters.');
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleAddClick = () => {
    setEditingRecruiter({ _id: '', name: '', logo: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (recruiter) => {
    setEditingRecruiter(recruiter);
    setIsModalOpen(true);
  };

  const handleSaveRecruiter = async (recruiterData) => {
    try {
      if (recruiterData._id) {
        await recruiterService.updateRecruiter(recruiterData._id, recruiterData);
        alert('Recruiter updated successfully!');
      } else {
        await recruiterService.createRecruiter(recruiterData);
        alert('Recruiter added successfully!');
      }
      fetchRecruiters();
      setIsModalOpen(false);
      setEditingRecruiter(null);
    } catch (error) {
      console.error('Error saving recruiter:', error);
      alert('Failed to save recruiter.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recruiter?')) {
      try {
        await recruiterService.deleteRecruiter(id);
        alert('Recruiter deleted successfully!');
        fetchRecruiters();
      } catch (error) {
        console.error('Error deleting recruiter:', error);
        alert('Failed to delete recruiter.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>Top Recruiters Content</h3>

      <div className="form-actions">
        <button onClick={handleAddClick} className="save-btn">Add New Recruiter</button>
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Top Recruiters</h4>
      <ul className="admin-list">
        {recruiters.map(recruiter => (
          <li key={recruiter._id} className="admin-list-item">
            <span>{recruiter.name}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditClick(recruiter)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(recruiter._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingRecruiter && (
        <RecruiterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveRecruiter}
          recruiter={editingRecruiter}
        />
      )}
    </section>
  );
};

export default TopRecruitersEditor;

import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import recruiterService from '../../../services/recruiterService';
import RecruiterModal from './RecruiterModal';
import Loader from '../../Loader';

const TopRecruitersEditor = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecruiter, setEditingRecruiter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecruiters = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await recruiterService.getRecruiters();
      setRecruiters(response.data);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      alert('Failed to fetch recruiters.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecruiters();
  }, [fetchRecruiters]);

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

  if (isLoading) {
    return <Loader text="Loading Recruiters..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>Top Recruiters Content</h3>
        <button onClick={handleAddClick} className="btn btn-primary">Add New Recruiter</button>
      </div>

      <ul className="admin-simple-list">
        {recruiters.map(recruiter => (
          <li key={recruiter._id} className="admin-simple-list-item">
            <span>{recruiter.name}</span>
            <div className="admin-list-item-actions">
              <button onClick={() => handleEditClick(recruiter)} className="btn-icon" title="Edit"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(recruiter._id)} className="btn-icon btn-danger" title="Delete"><Trash2 size={18} /></button>
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

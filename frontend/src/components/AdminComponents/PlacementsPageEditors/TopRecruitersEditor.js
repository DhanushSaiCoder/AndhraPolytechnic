import React, { useState, useEffect } from 'react';
import recruiterService from '../../../services/recruiterService';

const TopRecruitersEditor = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [currentRecruiter, setCurrentRecruiter] = useState({
    _id: '',
    name: '',
    logo: '',
  });
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecruiter(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddRecruiter = async () => {
    if (currentRecruiter.name.trim() === '' || currentRecruiter.logo.trim() === '') return;
    try {
      if (editingId) {
        await recruiterService.updateRecruiter(editingId, currentRecruiter);
        alert('Recruiter updated successfully!');
      } else {
        await recruiterService.createRecruiter(currentRecruiter);
        alert('Recruiter added successfully!');
      }
      fetchRecruiters(); // Re-fetch recruiters
      setCurrentRecruiter({ _id: '', name: '', logo: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving recruiter:', error);
      alert('Failed to save recruiter.');
    }
  };

  const handleEdit = (recruiter) => {
    setCurrentRecruiter(recruiter);
    setEditingId(recruiter._id);
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

      <div className="form-group">
        <label htmlFor="name">Company Name</label>
        <input type="text" id="name" name="name" value={currentRecruiter.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="logo">Logo URL</label>
        <input type="text" id="logo" name="logo" value={currentRecruiter.logo} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button onClick={handleAddRecruiter} className="save-btn">{editingId ? 'Save Changes' : 'Add Recruiter'}</button>
        {editingId && <button onClick={() => {setEditingId(null); setCurrentRecruiter({ _id: '', name: '', logo: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Top Recruiters</h4>
      <ul className="admin-list">
        {recruiters.map(recruiter => (
          <li key={recruiter._id} className="admin-list-item">
            <span>{recruiter.name}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(recruiter)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(recruiter._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopRecruitersEditor;
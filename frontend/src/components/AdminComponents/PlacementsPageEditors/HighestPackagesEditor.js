import React, { useState, useEffect } from 'react';
import highestPackageService from '../../../services/highestPackageService';

const HighestPackagesEditor = () => {
  const [packages, setPackages] = useState([]);
  const [currentPackage, setCurrentPackage] = useState({
    _id: '',
    name: '',
    department: '',
    package: '',
    company: '',
    year: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchPackages = async () => {
    try {
      const response = await highestPackageService.getHighestPackages();
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching highest packages:', error);
      alert('Failed to fetch highest packages.');
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPackage(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddPackage = async () => {
    if (currentPackage.name.trim() === '' || currentPackage.package.trim() === '') return;
    try {
      if (editingId) {
        await highestPackageService.updateHighestPackage(editingId, currentPackage);
        alert('Highest Package updated successfully!');
      } else {
        await highestPackageService.createHighestPackage(currentPackage);
        alert('Highest Package added successfully!');
      }
      fetchPackages(); // Re-fetch packages
      setCurrentPackage({ _id: '', name: '', department: '', package: '', company: '', year: '', image: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving highest package:', error);
      alert('Failed to save highest package.');
    }
  };

  const handleEdit = (pkg) => {
    setCurrentPackage(pkg);
    setEditingId(pkg._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this highest package?')) {
      try {
        await highestPackageService.deleteHighestPackage(id);
        alert('Highest Package deleted successfully!');
        fetchPackages();
      } catch (error) {
        console.error('Error deleting highest package:', error);
        alert('Failed to delete highest package.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>Highest Packages Content</h3>

      <div className="form-group">
        <label htmlFor="name">Student Name</label>
        <input type="text" id="name" name="name" value={currentPackage.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input type="text" id="department" name="department" value={currentPackage.department} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="package">Package (e.g., 12 LPA)</label>
        <input type="text" id="package" name="package" value={currentPackage.package} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" value={currentPackage.company} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input type="number" id="year" name="year" value={currentPackage.year} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input type="text" id="image" name="image" value={currentPackage.image} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button onClick={handleAddPackage} className="save-btn">{editingId ? 'Save Changes' : 'Add Package'}</button>
        {editingId && <button onClick={() => {setEditingId(null); setCurrentPackage({ _id: '', name: '', department: '', package: '', company: '', year: '', image: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Highest Packages</h4>
      <ul className="admin-list">
        {packages.map(pkg => (
          <li key={pkg._id} className="admin-list-item">
            <span>{pkg.name} - {pkg.package} at {pkg.company} ({pkg.year})</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(pkg)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(pkg._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HighestPackagesEditor;
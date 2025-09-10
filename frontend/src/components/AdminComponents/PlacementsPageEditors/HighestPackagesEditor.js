import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import highestPackageService from '../../../services/highestPackageService';
import HighestPackageModal from './HighestPackageModal';
import Loader from '../../Loader';

const HighestPackagesEditor = () => {
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPackages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await highestPackageService.getHighestPackages();
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching highest packages:', error);
      alert('Failed to fetch highest packages.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleAddClick = () => {
    setEditingPackage({
      _id: '',
      name: '',
      department: '',
      package: '',
      company: '',
      year: '',
      image: '',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (pkg) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const handleSavePackage = async (packageData) => {
    try {
      if (packageData._id) {
        await highestPackageService.updateHighestPackage(packageData._id, packageData);
        alert('Highest Package updated successfully!');
      } else {
        await highestPackageService.createHighestPackage(packageData);
        alert('Highest Package added successfully!');
      }
      fetchPackages();
      setIsModalOpen(false);
      setEditingPackage(null);
    } catch (error) {
      console.error('Error saving highest package:', error);
      alert('Failed to save highest package.');
    }
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

  if (isLoading) {
    return <Loader text="Loading Highest Packages..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>Highest Packages Content</h3>
        <button onClick={handleAddClick} className="btn btn-primary">Add New Package</button>
      </div>

      <ul className="admin-simple-list">
        {packages.map(pkg => (
          <li key={pkg._id} className="admin-simple-list-item">
            <span>{pkg.name} - {pkg.package} at {pkg.company} ({pkg.year})</span>
            <div className="admin-list-item-actions">
              <button onClick={() => handleEditClick(pkg)} className="btn-icon" title="Edit"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(pkg._id)} className="btn-icon btn-danger" title="Delete"><Trash2 size={18} /></button>
            </div>
          </li>
        ))}
      </ul>

      {editingPackage && (
        <HighestPackageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePackage}
          pkg={editingPackage}
        />
      )}
    </section>
  );
};

export default HighestPackagesEditor;

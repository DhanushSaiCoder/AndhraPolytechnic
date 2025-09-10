import React, { useState, useEffect } from 'react';
import departmentService from '../../services/departmentService';
import DepartmentModal from './DepartmentsPageEditors/DepartmentModal'; // Import the new modal

const initialDepartmentState = {
  _id: '',
  name: '',
  shortName: '',
  description: '',
  image: '',
  vision: '',
  mission: '',
  achievements: [],
  activities: [],
  courses: [],
  faculty: [],
  labs: [],
  events: [],
  totalSeats: '',
  highestPackageInfo: { packageCTC: '', companyName: '' },
  averagePackage: '',
};

const DepartmentsPageContentEditor = () => {
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      alert('Failed to fetch departments.');
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddClick = () => {
    setEditingDepartment({ ...initialDepartmentState });
    setIsModalOpen(true);
  };

  const handleEditClick = (dept) => {
    const departmentToEdit = {
      ...initialDepartmentState,
      ...dept,
      events: dept.events ? dept.events.map(e => ({ ...e, date: e.date ? new Date(e.date).toISOString().split('T')[0] : '' })) : [],
      highestPackageInfo: dept.highestPackageInfo || { packageCTC: '', companyName: '' },
      achievements: dept.achievements || [],
      activities: dept.activities || [],
      courses: dept.courses || [],
      faculty: dept.faculty ? dept.faculty.map(f => ({ ...f, socials: f.socials || [] })) : [],
      labs: dept.labs || [],
    };
    setEditingDepartment(departmentToEdit);
    setIsModalOpen(true);
  };

  const handleSaveDepartment = async (departmentData) => {
    try {
      if (departmentData._id) {
        await departmentService.updateDepartment(departmentData._id, departmentData);
        alert('Department updated successfully!');
      } else {
        await departmentService.createDepartment(departmentData);
        alert('Department added successfully!');
      }
      fetchDepartments();
      setIsModalOpen(false);
      setEditingDepartment(null);
    } catch (error) {
      console.error('Error saving department:', error);
      alert('Failed to save department.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await departmentService.deleteDepartment(id);
        alert('Department deleted successfully!');
        fetchDepartments();
      } catch (error) {
        console.error('Error deleting department:', error);
        alert('Failed to delete department.');
      }
    }
  };

  return (
    <div className="departments-content-editor">
      <h2>Departments Content Management</h2>

      <div className="form-actions">
        <button onClick={handleAddClick} className="save-btn">Add New Department</button>
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Departments</h4>
      <ul className="admin-list">
        {departments.map(dept => (
          <li key={dept._id} className="admin-list-item">
            <span>{dept.name} ({dept.shortName})</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditClick(dept)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(dept._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingDepartment && (
        <DepartmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveDepartment}
          department={editingDepartment}
        />
      )}
    </div>
  );
};

export default DepartmentsPageContentEditor;

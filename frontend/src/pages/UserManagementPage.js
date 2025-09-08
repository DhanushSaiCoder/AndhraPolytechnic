import React, { useState, useEffect } from 'react';
import { FiUsers, FiEdit, FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';
import userService from '../services/userService';
import UserFormModal from '../components/AuthComponents/UserFormModal';
import '../styles/UserManagement.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSave = async (userData) => {
    try {
      if (userData.id) {
        await userService.updateUser(userData.id, userData);
      } else {
        await userService.createUser(userData);
      }
      fetchUsers();
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-page">
      <div className="user-management-container">
        <header className="user-management-header">
          <div className="header-icon">
            <FiUsers size={40} />
          </div>
          <h1 className="user-management-title">Manage Users</h1>
          <p className="user-management-subtitle">
            View, edit, and manage user accounts with ease.
          </p>
        </header>

        <div className="toolbar">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-user-btn" onClick={handleAddNew}>
            <FiPlus />
            <span>Add New User</span>
          </button>
        </div>

        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className="user-details">
                        <span className="user-name">{user.name}</span>
                        <span className="user-id">ID: {user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge role-${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`} className="user-email">{user.email}</a>
                  </td>
                  <td className="actions-cell">
                    <button onClick={() => handleEdit(user)} className="action-btn edit-btn">
                      <FiEdit />
                      <span>Edit</span>
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="action-btn delete-btn">
                      <FiTrash2 />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagementPage;

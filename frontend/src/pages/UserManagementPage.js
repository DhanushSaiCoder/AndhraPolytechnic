import React, { useState, useEffect } from 'react';
import { FiUsers, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import '../styles/UserManagement.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', avatar: 'https://picsum.photos/seed/john/100/100' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', avatar: 'https://picsum.photos/seed/jane/100/100' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', role: 'User', avatar: 'https://picsum.photos/seed/peter/100/100' },
    { id: 4, name: 'Admin User', email: 'admin.user@example.com', role: 'Admin', avatar: 'https://picsum.photos/seed/admin/100/100' },
  ];

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const handleEdit = (userId) => {
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
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
          <button className="add-user-btn">Add New User</button>
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
                    <button onClick={() => handleEdit(user.id)} className="action-btn edit-btn">
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
    </div>
  );
};

export default UserManagementPage;
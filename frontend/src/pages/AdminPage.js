import React from 'react';
import { Shield, Users, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const adminTasks = [
    {
      title: 'Manage Content',
      description: 'Update website content, such as news, events, and departmental information.',
      icon: <FileText size={24} />,
      link: '/admin/content',
    },
    {
      title: 'Manage Users',
      description: 'Add, edit, or remove user accounts and manage their roles and permissions.',
      icon: <Users size={24} />,
      link: '/admin/users',
    },

    {
      title: 'System Settings',
      description: 'Configure system-wide settings, such as maintenance mode and API integrations.',
      icon: <Settings size={24} />,
      link: '/admin/settings',
    },
    {
      title: 'View Audit Logs',
      description: 'Review a log of all administrative actions for security and accountability purposes.',
      icon: <Shield size={24} />,
      link: '/admin/logs',
    },
  ];

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">
            Welcome, Administrator. From here, you can manage users, content, and system settings.
          </p>
        </div>

        <div className="admin-grid">
          {adminTasks.map((task, index) => (
            <div key={index} className="admin-card">
              <div className="admin-card-header">
                <div className="admin-card-icon">{task.icon}</div>
                <h2 className="admin-card-title">{task.title}</h2>
              </div>
              <p className="admin-card-description">{task.description}</p>
              <Link to={task.link} className="admin-card-button">
                Go to {task.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
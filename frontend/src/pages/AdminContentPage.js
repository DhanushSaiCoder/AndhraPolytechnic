import React, { useState } from 'react';
import '../styles/AdminContent.css';
import HomePageContentEditor from '../components/AdminComponents/HomePageContentEditor';
import PlacementsPageContentEditor from '../components/AdminComponents/PlacementsPageContentEditor';
import DepartmentsPageContentEditor from '../components/AdminComponents/DepartmentsPageContentEditor';
import AcademicsPageContentEditor from '../components/AdminComponents/AcademicsPageContentEditor';

const AdminContentPage = () => {
  const [selectedSection, setSelectedSection] = useState('home'); // Default to home page content

  return (
    <div className="admin-content-page">
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Content Management</h2>
        <nav className="sidebar-nav">
          <ul>
            <li className={selectedSection === 'home' ? 'active' : ''}>
              <button onClick={() => setSelectedSection('home')}>Home Page</button>
            </li>
            <li className={selectedSection === 'academics' ? 'active' : ''}>
              <button onClick={() => setSelectedSection('academics')}>Academics Page</button>
            </li>
            <li className={selectedSection === 'placements' ? 'active' : ''}>
              <button onClick={() => setSelectedSection('placements')}>Placements Page</button>
            </li>
            <li className={selectedSection === 'departments' ? 'active' : ''}>
              <button onClick={() => setSelectedSection('departments')}>Departments Page</button>
            </li>
            {/* Add more pages as needed */}
          </ul>
        </nav>
      </aside>
      <main className="admin-main-content">
        <h1 className="main-content-title">Manage {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)} Content</h1>
        {/* Render content based on selectedSection */}
        {selectedSection === 'home' && <HomePageContentEditor />}
        {selectedSection === 'academics' && <AcademicsPageContentEditor />}
        {selectedSection === 'placements' && <PlacementsPageContentEditor />}
        {selectedSection === 'departments' && <DepartmentsPageContentEditor />}
      </main>
    </div>
  )
}
export default AdminContentPage;
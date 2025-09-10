import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';
import AdminContentSidebar from '../components/AdminComponents/AdminContentSidebar';
import { contentSections } from '../components/AdminComponents/adminContentConfig';
import '../components/AdminComponents/adminContent.css';
import '../styles/AdminContent.css'; // Import the core admin content styles

const AdminContentPlaceholder = () => (
  <div className="admin-content-placeholder">
    <FileText size={48} />
    <h2>Select Content to Manage</h2>
    <p>Choose a page and a specific section from the sidebar to start editing its content.</p>
  </div>
);

const AdminContentPage = () => {
  const location = useLocation();
  const isRootAdminContent = location.pathname === '/admin/content' || location.pathname === '/admin/content/';

  return (
    <div className="admin-content-layout">
      <AdminContentSidebar />
      <main className="admin-content-main">
        {isRootAdminContent && <AdminContentPlaceholder />}
        <Routes>
          {contentSections.map(section => (
            section.subsections.map(subsection => (
              <Route
                key={`${section.path}-${subsection.path}`}
                path={`${section.path}/${subsection.path}`}
                element={<subsection.component />}
              />
            ))
          ))}
        </Routes>
      </main>
    </div>
  );
};

export default AdminContentPage;

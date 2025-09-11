import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';
import AdminContentSidebar from '../components/AdminComponents/AdminContentSidebar';
import { contentSections } from '../components/AdminComponents/adminContentConfig';
import '../components/AdminComponents/adminContent.css';
import '../styles/AdminContent.css';

const AdminContentPlaceholder = () => (
  <div className="admin-content-placeholder">
    <FileText size={48} />
    <h2>Select Content to Manage</h2>
    <p>Choose a page and a specific section from the sidebar to start editing its content.</p>
  </div>
);

const AdminContentPage = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isRootAdminContent = location.pathname === '/admin/content' || location.pathname === '/admin/content/';

  useEffect(() => {
    // Close sidebar on route change on mobile
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`admin-content-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
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
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default AdminContentPage;


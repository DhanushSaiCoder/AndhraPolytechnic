import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { contentSections } from './adminContentConfig';

const AdminContentSidebar = () => {
  const location = useLocation();
  const currentBasePath = location.pathname.split('/').slice(0, 4).join('/');

  const [openSections, setOpenSections] = useState(() => {
    const activeSection = contentSections.find(section => 
      `${currentBasePath}`.startsWith(`/admin/content/${section.path}`)
    );
    return activeSection ? [activeSection.path] : [];
  });

  const toggleSection = (path) => {
    setOpenSections(prevOpen => 
      prevOpen.includes(path) ? prevOpen.filter(p => p !== path) : [...prevOpen, path]
    );
  };

  return (
    <nav className="admin-content-sidebar">
      <ul className="sidebar-nav-list">
        {contentSections.map(section => {
          const isOpen = openSections.includes(section.path);
          return (
            <li key={section.path} className={`sidebar-nav-item ${isOpen ? 'open' : ''}`}>
              <div className="nav-item-title" onClick={() => toggleSection(section.path)}>
                <span>{section.title}</span>
                <ChevronRight size={18} />
              </div>
              <ul className="sidebar-submenu">
                {section.subsections.map(subsection => (
                  <li key={subsection.path} className="sidebar-submenu-item">
                    <NavLink to={`/admin/content/${section.path}/${subsection.path}`}>
                      {subsection.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminContentSidebar;

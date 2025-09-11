import React from 'react';
import '../../styles/DepartmentsStyles/DepartmentsPage.css';

const DepartmentsPageSkeleton = () => {
  return (
    <div className="departments-page-container">
      <header className="departments-header-section">
        <div className="skeleton skeleton-badge"></div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-description"></div>
      </header>

      <section className="departments-grid-section">
        <div className="departments-grid-container">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="department-card-link">
              <div className="department-card-item">
                <div className="skeleton skeleton-card-icon"></div>
                <div className="skeleton skeleton-card-title"></div>
                <div className="skeleton skeleton-card-shortname"></div>
                <div className="skeleton skeleton-card-description"></div>
                <div className="department-card-footer">
                  <div className="skeleton skeleton-learn-more"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DepartmentsPageSkeleton;

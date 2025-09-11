import React from 'react';
import '../../styles/HomeStyles/Departments.css';

const DepartmentsSkeleton = () => {
  return (
    <section className="departmentsComponent-section">
      <div className="departments-container">
        <div className="departments-header">
          <div className="skeleton skeleton-badge"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-description"></div>
        </div>

        <div className="departments-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="department-card">
              <div className="skeleton skeleton-icon"></div>
              <div className="skeleton skeleton-code"></div>
              <div className="skeleton skeleton-department-title"></div>
              <div className="skeleton skeleton-department-description"></div>
              <div className="department-stats">
                <div className="skeleton skeleton-learn-more"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSkeleton;

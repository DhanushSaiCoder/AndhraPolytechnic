import React from 'react';
import '../../styles/PlacementsStyles/HighestPackages.css';

const HighestPackagesSkeleton = () => {
  return (
    <section className="highest-packages-section">
      <div className="highest-packages-container">
        <header className="highest-packages-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </header>

        <div className="package-cards-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="package-card">
              <div className="skeleton skeleton-avatar"></div>
              <div className="skeleton skeleton-name"></div>
              <div className="skeleton skeleton-department"></div>
              <div className="package-details">
                <div className="skeleton skeleton-package"></div>
                <div className="skeleton skeleton-company"></div>
              </div>
              <div className="skeleton skeleton-year"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighestPackagesSkeleton;

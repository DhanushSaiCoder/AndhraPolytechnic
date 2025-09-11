import React from 'react';
import '../../styles/PlacementsStyles/PlacementStats.css';

const PlacementStatsSkeleton = () => {
  return (
    <section className="placement-stats-section">
      <div className="placement-stats-container">
        <header className="placement-stats-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </header>

        <div className="placement-stats-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="placement-stat-card">
              <div className="skeleton skeleton-icon"></div>
              <div className="skeleton skeleton-value"></div>
              <div className="skeleton skeleton-label"></div>
              <div className="skeleton skeleton-desc"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementStatsSkeleton;

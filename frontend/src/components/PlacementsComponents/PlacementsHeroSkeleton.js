import React from 'react';
import '../../styles/PlacementsStyles/PlacementsHeroSection.css';

const PlacementsHeroSkeleton = () => {
  return (
    <header className="placements-hero-section">
      <div className="placements-badge">
        <div className="skeleton skeleton-badge-icon"></div>
        <div className="skeleton skeleton-badge-text"></div>
      </div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-description"></div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <div className="skeleton skeleton-chart"></div>
        </div>
        <div className="chart-wrapper">
          <div className="skeleton skeleton-chart"></div>
        </div>
      </div>
    </header>
  );
};

export default PlacementsHeroSkeleton;

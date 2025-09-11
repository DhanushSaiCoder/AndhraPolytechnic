import React from 'react';
import '../../styles/HomeStyles/CurrentInfo.css';

const CurrentInfoSkeleton = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <header className="stats-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </header>

        <div className="stats-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="stat-card">
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

export default CurrentInfoSkeleton;

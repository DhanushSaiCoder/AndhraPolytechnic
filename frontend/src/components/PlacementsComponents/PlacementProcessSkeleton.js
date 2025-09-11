import React from 'react';
import '../../styles/PlacementsStyles/PlacementProcess.css';

const PlacementProcessSkeleton = () => {
  return (
    <section className="placement-process-section">
      <div className="placement-process-container">
        <header className="placement-process-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </header>

        <div className="process-steps">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="process-step-card">
              <div className="skeleton skeleton-step-number"></div>
              <div className="skeleton skeleton-step-title"></div>
              <div className="skeleton skeleton-step-description"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementProcessSkeleton;

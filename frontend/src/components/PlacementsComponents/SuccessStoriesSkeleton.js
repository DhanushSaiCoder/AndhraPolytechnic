import React from 'react';
import '../../styles/PlacementsStyles/SuccessStories.css';

const SuccessStoriesSkeleton = () => {
  return (
    <section className="success-stories-section">
      <div className="success-stories-container">
        <header className="success-stories-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </header>

        <div className="stories-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="story-card">
              <div className="story-card-header">
                <div className="skeleton skeleton-avatar"></div>
                <div className="story-info">
                  <div className="skeleton skeleton-name"></div>
                  <div className="skeleton skeleton-role"></div>
                </div>
              </div>
              <div className="skeleton skeleton-quote"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSkeleton;

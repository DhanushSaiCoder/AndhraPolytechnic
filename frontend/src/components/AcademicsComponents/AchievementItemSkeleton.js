import React from 'react';
import '../../styles/AcademicsStyles/AcademicAchievementsPage.css';

const AchievementItemSkeleton = () => {
  return (
    <div className="achievements-page-item has-slider">
      <div className="achievement-item-content">
        <div className="achievements-page-item-header">
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton skeleton-title"></div>
        </div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
      <div className="achievements-page-image-slider">
        <div className="skeleton skeleton-slider"></div>
      </div>
    </div>
  );
};

export default AchievementItemSkeleton;

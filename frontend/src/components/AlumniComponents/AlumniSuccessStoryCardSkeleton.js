import React from 'react';
import '../../styles/AlumniStyles/AlumniSuccessStories.css';

const AlumniSuccessStoryCardSkeleton = () => {
  return (
    <div className="alumni-story-card">
      <div className="alumni-story-header">
        <div className="skeleton skeleton-avatar"></div>
        <div className="alumni-story-info">
          <div className="skeleton skeleton-name"></div>
          <div className="skeleton skeleton-meta"></div>
          <div className="skeleton skeleton-work"></div>
        </div>
      </div>
      <div className="skeleton skeleton-description"></div>
      <div className="skeleton skeleton-description"></div>
    </div>
  );
};

export default AlumniSuccessStoryCardSkeleton;

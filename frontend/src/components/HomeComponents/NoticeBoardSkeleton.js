import React from 'react';
import '../../styles/HomeStyles/NoticeBoard.css';

const NoticeBoardSkeleton = () => {
  return (
    <div className="notice-board">
      <div className="notice-board-grid">
        <div className="notice-section">
          <div className="notice-section-header">
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-title"></div>
          </div>
          <div className="section-list">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="news-card">
                <div className="news-card-content">
                  <div className="skeleton skeleton-card-title"></div>
                  <div className="skeleton skeleton-card-description"></div>
                  <div className="skeleton skeleton-card-date"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="notice-section">
          <div className="notice-section-header">
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-title"></div>
          </div>
          <div className="section-list">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="notification-card">
                <div className="notification-card-content">
                  <div className="skeleton skeleton-card-title"></div>
                  <div className="skeleton skeleton-card-description"></div>
                  <div className="skeleton skeleton-card-date"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoardSkeleton;

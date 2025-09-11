import React from 'react';
import './UpdatesMarquee.css';

const UpdatesMarqueeSkeleton = () => {
  return (
    <div className="updates-marquee">
      <div className="marquee-viewport">
        <div className="marquee-content">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="marquee-item">
              <div className="skeleton skeleton-badge"></div>
              <div className="skeleton skeleton-item-title"></div>
              <div className="skeleton skeleton-item-date"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatesMarqueeSkeleton;

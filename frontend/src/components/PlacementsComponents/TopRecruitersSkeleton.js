import React from 'react';
import '../../styles/PlacementsStyles/TopRecruiters.css';

const TopRecruitersSkeleton = () => {
  return (
    <section className="top-recruiters-section">
      <div className="top-recruiters-container">
        <header className="top-recruituers-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </header>

        <div className="recruiters-scroll-container">
          <div className="recruiters-track">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="recruiter-item">
                <div className="skeleton skeleton-logo"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRecruitersSkeleton;

import React from 'react';
import '../../styles/AcademicsStyles/Admissions.css';

const AdmissionsPageSkeleton = () => {
  return (
    <div className="admissions-page-container">
      <header className="admissions-page-hero">
        <div className="skeleton skeleton-badge"></div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-description"></div>
      </header>

      <main className="admissions-page-content">
        <section className="admission-section">
          <div className="skeleton skeleton-subtitle"></div>
          <div className="admission-process-grid">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="admission-step-card">
                <div className="skeleton skeleton-icon-wrapper"></div>
                <div className="skeleton skeleton-step-title"></div>
                <div className="skeleton skeleton-step-description"></div>
              </div>
            ))}
          </div>
        </section>

        <section className="admission-section">
          <div className="admission-info-grid">
            <div className="admission-info-card">
              <div className="skeleton skeleton-info-title"></div>
              <div className="skeleton skeleton-info-list"></div>
            </div>
            <div className="admission-info-card">
              <div className="skeleton skeleton-info-title"></div>
              <div className="skeleton skeleton-info-list"></div>
            </div>
          </div>
        </section>

        <section className="admission-section admission-contact-section">
          <div className="skeleton skeleton-subtitle"></div>
          <div className="admission-contact-grid">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="admission-contact-card">
                <div className="skeleton skeleton-contact-icon"></div>
                <div className="skeleton skeleton-contact-title"></div>
                <div className="skeleton skeleton-contact-text"></div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdmissionsPageSkeleton;

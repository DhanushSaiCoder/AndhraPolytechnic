import React from 'react';
import '../../styles/AcademicsStyles/Syllabus.css';

const SyllabusSectionSkeleton = () => {
  return (
    <section className="syllabus__root">
      <div className="syllabus__container">
        <header className="syllabus__header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </header>

        <div className="syllabus__controls">
          <div className="skeleton skeleton-search-input"></div>
          <div className="syllabus__filters">
            <div className="skeleton skeleton-select"></div>
            <div className="skeleton skeleton-select"></div>
          </div>
        </div>

        <div className="syllabus__content-area">
          <div className="syllabus__results">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="syllabus__semester-group">
                <div className="skeleton skeleton-semester-title"></div>
                <div className="syllabus__grid">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="syllabus__subject-card">
                      <div className="skeleton skeleton-card-main"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SyllabusSectionSkeleton;

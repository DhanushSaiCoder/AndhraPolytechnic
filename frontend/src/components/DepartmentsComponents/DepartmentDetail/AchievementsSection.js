import React from 'react';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const AchievementsSection = ({ achievements }) => {
  return (
    <div className="department-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            Achievements
          </h2>
          <p className="section-subtitle">
            Celebrating the accomplishments of our students and faculty.
          </p>
        </div>
        <ul className="achievements-list">
          {achievements.map((achievement, index) => (
            <li key={index} className="achievement-item">
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AchievementsSection;
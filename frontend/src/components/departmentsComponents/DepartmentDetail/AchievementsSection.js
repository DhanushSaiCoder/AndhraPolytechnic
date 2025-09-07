import React from 'react';
import { Award } from 'lucide-react';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const AchievementsSection = ({ achievements }) => {
  return (
    <div className="department-section">
      <div className="section-header">
        <h2 className="section-title">
          <Award size={24} />
          Achievements
        </h2>
      </div>
      <ul className="achievements-list">
        {achievements.map((achievement, index) => (
          <li key={index} className="achievement-item">
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementsSection;

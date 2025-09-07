import React from 'react';
import { Zap } from 'lucide-react';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const ActivitiesSection = ({ activities }) => {
  return (
    <div className="department-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            <Zap size={24} />
            Activities
          </h2>
        </div>
        <ul className="activities-list">
          {activities.map((activity, index) => (
            <li key={index} className="activity-item">
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivitiesSection;
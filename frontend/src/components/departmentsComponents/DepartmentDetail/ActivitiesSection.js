import React from 'react';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const ActivitiesSection = ({ activities }) => {
  return (
    <div className="department-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            Activities
          </h2>
          <p className="section-subtitle">
            Engaging in co-curricular and extra-curricular activities.
          </p>
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
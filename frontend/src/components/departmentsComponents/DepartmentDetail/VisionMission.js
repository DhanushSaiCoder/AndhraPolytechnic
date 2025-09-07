import React from 'react';
import { Eye, Goal } from 'lucide-react';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const VisionMission = ({ department }) => {
  return (
    <div className="department-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            <Eye size={24} />
            Vision & Mission
          </h2>
        </div>
        <div className="vision-mission-content">
          <div className="vm-item">
            <h3><Eye size={20} /> Vision</h3>
            <p>{department.vision}</p>
          </div>
          <div className="vm-item">
            <h3><Goal size={20} /> Mission</h3>
            <p>{department.mission}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;

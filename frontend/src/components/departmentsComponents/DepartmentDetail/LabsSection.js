import React from 'react';
import LabCarousel from '../LabCarousel';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const LabsSection = ({ department }) => {
  return (
    <div className="department-section labs-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            Our Labs
          </h2>
          <p className="section-subtitle">
            State-of-the-art laboratories and facilities.
          </p>
        </div>
        <LabCarousel labs={department.labs} />
      </div>
    </div>
  );
};

export default LabsSection;
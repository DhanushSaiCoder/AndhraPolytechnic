import React from 'react';
import FacultyCarousel from '../FacultyCarousel';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const FacultySection = ({ department }) => {
  return (
    <div className="department-section faculty-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            Our Faculty
          </h2>
          <p className="section-subtitle">
            Meet the dedicated and experienced members of our faculty.
          </p>
        </div>
        <FacultyCarousel faculty={department.faculty} />
      </div>
    </div>
  );
};

export default FacultySection;
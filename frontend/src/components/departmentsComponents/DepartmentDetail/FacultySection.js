import React from 'react';
import { Users } from 'lucide-react';
import FacultyCarousel from '../FacultyCarousel';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const FacultySection = ({ department }) => {
  return (
    <div className="department-section">
      <div className="section-header">
        <h2 className="section-title">
          <Users size={24} />
          Our Faculty
        </h2>
      </div>
      <FacultyCarousel faculty={department.faculty} />
    </div>
  );
};

export default FacultySection;

import React from 'react';
import { Beaker } from 'lucide-react';
import LabCarousel from '../LabCarousel';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const LabsSection = ({ department }) => {
  return (
    <div className="department-section">
      <div className="section-header">
        <h2 className="section-title">
          <Beaker size={24} />
          Our Labs
        </h2>
      </div>
      <LabCarousel labs={department.labs} />
    </div>
  );
};

export default LabsSection;

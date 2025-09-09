import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';
import ImageLoader from '../../ImageLoader/ImageLoader';

const DepartmentHero = ({ department }) => {
  return (
    <div className="department-detail-header">
      <Link to="/departments" className="back-button">
        <ArrowLeft size={20} />
        <span>Back to Departments</span>
      </Link>
      <ImageLoader src={department.image} alt={department.name} className="department-header-image" />
      <div className="department-header-overlay"></div>
      <div className="department-header-content">
        <div className="department-header-text-wrapper">
          <h1>{department.name}</h1>
          <p>{department.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHero;

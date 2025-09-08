import React from 'react';
import { Link } from 'react-router-dom';
import departmentsData from '../data/departmentsData.json';
import '../styles/DepartmentsStyles/DepartmentsPage.css';
import { ChevronRight, Building } from 'lucide-react';
import { departmentIcons, DefaultIcon } from '../data/departmentIcons';

const DepartmentsPage = () => {
  return (
    <div className="departments-page-container">
      <header className="departments-header-section">
        <div className="departments-badge">
          <Building className="badge-icon" />
          <span className="badge-text">Our Departments</span>
        </div>
        <h1 className="departments-title-main">
          Explore Our <span className="title-highlight">Academic Departments</span>
        </h1>
        <p className="departments-description-main">
          Discover the diverse fields of study and innovation offered at Andhra Polytechnic. Each department is dedicated to providing quality education, fostering research, and preparing students for successful careers.
        </p>
      </header>

      <section className="departments-grid-section">
        <div className="departments-grid-container">
          {departmentsData.map((dept) => {
            const Icon = departmentIcons[dept.id] || DefaultIcon;
            return (
              <Link to={`/departments/${dept.id}`} key={dept.id} className="department-card-link">
                <div className="department-card-item">
                  <div className="card-gradient-bg"></div>
                  <div className="department-icon-wrapper">
                    <Icon className="department-card-icon" />
                  </div>
                  <h2 className="department-card-title">{dept.name}</h2>
                  <p className="department-card-shortname">{dept.shortName}</p>
                  <p className="department-card-description">{dept.description.substring(0, 150)}...</p>
                  <div className="department-card-footer">
                    <span className="learn-more-btn">Learn More <ChevronRight size={16} /></span>
                  </div>
                  <div className="accent-line"></div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DepartmentsPage;
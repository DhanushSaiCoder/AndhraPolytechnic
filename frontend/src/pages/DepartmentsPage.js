
import React from 'react';
import LabCarousel from '../components/DepartmentsComponents/LabCarousel';
import StatsBar from '../components/DepartmentsComponents/StatsBar';
import '../styles/DepartmentsStyles/Departments.css'; // Adjust the path as necessary
import {departmentsData} from '../data/departmentsData'; // Adjust the path as necessary

const getIconEmoji = (departmentName) => {
  switch (departmentName.toLowerCase()) {
    case 'computer science':
      return '💻';
    case 'electronics and communication':
      return '⚡';
    case 'mechanical engineering':
      return '⚙️';
    case 'civil engineering':
      return '🏗️';
    default:
      return '🎓';
  }
};

const DepartmentsPage = () => {
  return (
    <section className="departments-section">
      <div className="departments-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Academic Departments</h2>
          <p className="section-description">
            Explore our diverse academic departments, each dedicated to providing quality education and research opportunities. 
            
          </p>
          {/* <div className="section-divider"></div> */}
        </div>

        {/* Departments Grid */}
        <div className="departments-grid">
          {departmentsData.map((department) => (
            <div key={department.id} className="department-page-department-card">
              <div className="card-header">
                <div className="header-content">
                  <span className="department-emoji">{getIconEmoji(department.departmentName)}</span>
                  <div className="header-text">
                    <h3 className="department-name">{department.departmentName}</h3>
                    <p className="department-head">Head of Department: {department.headOfDepartment}</p>
                  </div>
                </div>
              </div>

              <div className="card-content">
                <p className="department-description">{department.description}</p>

                {/* Stats Bar */}
                <StatsBar 
                  totalSeats={department.totalSeats}
                  highestPackageInfo={department.highestPackage}
                  averagePackage={department.averagePackage}
                />

                {/* Lab Images Section */}
                <div className="labs-section">
                  <h4 className="labs-title">
                    <span className="title-dot"></span>
                    Laboratory Facilities
                  </h4>
                  <LabCarousel 
                    images={department.labs.map(lab => ({
                      src: lab.labImage,
                      alt: lab.labName,
                      caption: lab.labDescription
                    }))}
                  />
                </div>
              </div>

              <div className="card-footer">
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.href = department.viewFactulty}
                >
                  View Faculty
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => window.location.href = department.viewCurriculum}
                >
                  View Curriculum
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action
        <div className="cta-section">
          <div className="cta-card">
            <h3 className="cta-title">Ready to Start Your Journey?</h3>
            <p className="cta-description">
              Discover which department aligns with your career goals and interests.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Apply Now</button>
              <button className="btn btn-secondary">Schedule Campus Visit</button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default DepartmentsPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DepartmentsStyles/DepartmentsPage.css';
import { ChevronRight, Building } from 'lucide-react';
import { departmentIcons, DefaultIcon } from '../data/departmentIcons';
import departmentService from '../services/departmentService'; // Import departmentService
import DepartmentsPageSkeleton from '../components/DepartmentsComponents/DepartmentsPageSkeleton';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentService.getDepartments();
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setDepartments([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <DepartmentsPageSkeleton />;
  }

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
          {departments.map((dept) => { // Changed from departmentsData.map
            const Icon = departmentIcons[dept.shortName] || DefaultIcon; // Use shortName for icon mapping
            return (
              <Link to={`/departments/${dept._id}`} key={dept._id} className="department-card-link"> {/* Use _id for link and key */}
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

import React from 'react';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const CoursesSection = ({ courses }) => {
  return (
    <div className="department-section courses-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            Courses Offered
          </h2>
          <p className="section-subtitle">
            Exploring the curriculum and courses available in our department.
          </p>
        </div>
        <ul className="courses-list">
          {courses.map((course, index) => (
            <li key={index} className="course-item">
              <strong>{course.code}:</strong> {course.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursesSection;
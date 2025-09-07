import React from 'react';
import { BookOpen } from 'lucide-react';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const CoursesSection = ({ courses }) => {
  return (
    <div className="department-section">
      <div className="department-section-container">
        <div className="section-header">
          <h2 className="section-title">
            <BookOpen size={24} />
            Courses Offered
          </h2>
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
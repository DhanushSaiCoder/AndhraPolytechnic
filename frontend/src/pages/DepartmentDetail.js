import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { departmentsData } from '../data/departmentsData';
import '../styles/DepartmentsStyles/DepartmentDetail.css';
import {
  ArrowLeft,
  Eye,
  Target,
  Users,
  FlaskConical,
  BookOpen,
  Activity,
  Trophy,
} from 'lucide-react';

const DepartmentDetail = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();

  const department = departmentsData.find((dept) => dept.id === departmentId);

  if (!department) {
    return (
      <div className="department-detail-container not-found">
        <h2>Department Not Found</h2>
        <p>The department you are looking for does not exist.</p>
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} /> Back
        </button>
      </div>
    );
  }

  return (
    <div className="department-detail-container">
      <header className="department-detail-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} /> Back
        </button>
        <img src={department.image} alt={department.name} className="department-header-image" />
        <div className="department-header-overlay"></div>
        <div className="department-header-content">
          <div className="department-header-text-wrapper">
            <h1>{department.name} ({department.shortName})</h1>
            <p>{department.description}</p>
          </div>
        </div>
      </header>

      <section className="department-sections-grid">
        <div className="department-section vision-mission">
          <h2 className="section-title"><Eye size={24} /> Vision & Mission</h2>
          <div className="vision-mission-content">
            <div className="vm-item">
              <h3>Vision:</h3>
              <p>{department.vision}</p>
            </div>
            <div className="vm-item">
              <h3>Mission:</h3>
              <p>{department.mission}</p>
            </div>
          </div>
        </div>

        <div className="department-section faculty-profiles">
          <h2 className="section-title"><Users size={24} /> Faculty Profiles</h2>
          <ul className="faculty-list">
            {department.faculty.map((member, index) => (
              <li key={index} className="faculty-item">
                <strong>{member.name}</strong> - {member.designation} ({member.specialization})
              </li>
            ))}
          </ul>
        </div>

        <div className="department-section labs-facilities">
          <h2 className="section-title"><FlaskConical size={24} /> Labs & Facilities</h2>
          <ul className="labs-list">
            {department.labs.map((lab, index) => (
              <li key={index} className="lab-item">
                <strong>{lab.name}:</strong> {lab.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="department-section courses-syllabus">
          <h2 className="section-title"><BookOpen size={24} /> Courses Offered / Syllabus</h2>
          <ul className="courses-list">
            {department.courses.map((course, index) => (
              <li key={index} className="course-item">
                <strong>{course.code}:</strong> {course.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="department-section student-activities">
          <h2 className="section-title"><Activity size={24} /> Student Activities / Projects</h2>
          <ul className="activities-list">
            {department.activities.map((activity, index) => (
              <li key={index} className="activity-item">{activity}</li>
            ))}
          </ul>
        </div>

        <div className="department-section departmental-achievements">
          <h2 className="section-title"><Trophy size={24} /> Departmental Achievements</h2>
          <ul className="achievements-list">
            {department.achievements.map((achievement, index) => (
              <li key={index} className="achievement-item">{achievement}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DepartmentDetail;

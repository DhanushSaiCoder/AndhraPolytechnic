import React from 'react';
import { useParams } from 'react-router-dom';
import departmentsData from '../data/departmentsData.json';
import NotFound from './NotFound';
import DepartmentHero from '../components/DepartmentsComponents/DepartmentDetail/DepartmentHero';
import VisionMission from '../components/DepartmentsComponents/DepartmentDetail/VisionMission';
import FacultySection from '../components/DepartmentsComponents/DepartmentDetail/FacultySection';
import LabsSection from '../components/DepartmentsComponents/DepartmentDetail/LabsSection';
import CoursesSection from '../components/DepartmentsComponents/DepartmentDetail/CoursesSection';
import ActivitiesSection from '../components/DepartmentsComponents/DepartmentDetail/ActivitiesSection';
import AchievementsSection from '../components/DepartmentsComponents/DepartmentDetail/AchievementsSection';
import '../styles/DepartmentsStyles/DepartmentDetail.css';

const DepartmentDetail = () => {
  const { id } = useParams();
  const department = departmentsData.find(dep => dep.id === id);

  if (!department) {
    return <NotFound />;
  }

  return (
    <div className="department-detail-container">
      <DepartmentHero department={department} />
      <div className="department-sections-grid">
        <div className="department-section">
          <VisionMission department={department} />
        </div>
        <div className="department-section faculty-profiles">
          <FacultySection department={department} />
        </div>
        <div className="department-section labs-facilities">
          <LabsSection department={department} />
        </div>
        <CoursesSection courses={department.courses} />
        <ActivitiesSection activities={department.activities} />
        <AchievementsSection achievements={department.achievements} />
      </div>
    </div>
  );
};

export default DepartmentDetail;

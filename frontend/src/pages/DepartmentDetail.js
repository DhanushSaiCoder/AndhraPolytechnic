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
      <VisionMission department={department} />
      <FacultySection department={department} />
      <LabsSection department={department} />
      <CoursesSection courses={department.courses} />
      <ActivitiesSection activities={department.activities} />
      <AchievementsSection achievements={department.achievements} />
    </div>
  );
};

export default DepartmentDetail;
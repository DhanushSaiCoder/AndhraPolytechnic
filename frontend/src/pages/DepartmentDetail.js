import React from 'react';
import { useParams } from 'react-router-dom';
import departmentsData from '../data/departmentsData.json';
import NotFound from './NotFound';
import DepartmentHero from '../components/DepartmentsComponents/DepartmentDetail/DepartmentHero';
import VisionMission from '../components/DepartmentsComponents/DepartmentDetail/VisionMission';
import FacultySection from '../components/DepartmentsComponents/DepartmentDetail/FacultySection';
import LabsSection from '../components/DepartmentsComponents/DepartmentDetail/LabsSection';
import EventsSection from '../components/DepartmentsComponents/DepartmentDetail/EventsSection'; // Import EventsSection
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
      <EventsSection events={department.events} /> {/* Pass events prop */}
    </div>
  );
};

export default DepartmentDetail;

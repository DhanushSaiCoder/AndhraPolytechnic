import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import DepartmentHero from '../components/DepartmentsComponents/DepartmentDetail/DepartmentHero';
import VisionMission from '../components/DepartmentsComponents/DepartmentDetail/VisionMission';
import FacultySection from '../components/DepartmentsComponents/DepartmentDetail/FacultySection';
import LabsSection from '../components/DepartmentsComponents/DepartmentDetail/LabsSection';
import EventsSection from '../components/DepartmentsComponents/DepartmentDetail/EventsSection'; // Import EventsSection
import '../styles/DepartmentsStyles/DepartmentDetail.css';
import departmentService from '../services/departmentService'; // Import departmentService

const DepartmentDetail = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await departmentService.getDepartmentById(id);
        setDepartment(response.data);
      } catch (error) {
        console.error('Error fetching department details:', error);
        setDepartment(null); // Ensure department is null on error
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]); // Re-fetch if ID changes

  if (loading) {
    return <div className="department-detail-container not-found">Loading department details...</div>; // Simple loading indicator
  }

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

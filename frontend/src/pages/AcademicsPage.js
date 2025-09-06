import React from 'react';
import '../styles/AcademicsStyles/Academics.css';

// Placeholder imports for Academics components
import AcademicAchievements from '../components/AcademicsComponents/AcademicAchievements';
import AdmissionsInfo from '../components/AcademicsComponents/AdmissionsInfo';
import ExaminationsResults from '../components/AcademicsComponents/ExaminationsResults';

const AcademicsPage = () => {
  return (
    <div className='AcademicsPage'>
      <h1>Academics</h1>
      
      <AcademicAchievements />
      <AdmissionsInfo />
      <ExaminationsResults />
    </div>
  );
};

export default AcademicsPage;

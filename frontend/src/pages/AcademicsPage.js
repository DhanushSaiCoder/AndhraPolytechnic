import React from 'react';
import '../styles/AcademicsStyles/Academics.css';

// Placeholder imports for Academics components
import AcademicAchievements from '../components/AcademicsComponents/AcademicAchievements';
import AdmissionsInfo from '../components/AcademicsComponents/AdmissionsInfo';

const AcademicsPage = () => {
  return (
    <div className='AcademicsPage'>
      <h1>Academics</h1>
      <AcademicAchievements />
      <AdmissionsInfo />
    </div>
  );
};

export default AcademicsPage;

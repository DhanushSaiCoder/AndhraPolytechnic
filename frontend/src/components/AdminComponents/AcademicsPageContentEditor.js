import React from 'react';
import AcademicAchievementsEditor from './AcademicsPageEditors/AcademicAchievementsEditor';
import AdmissionsPageEditor from './AcademicsPageEditors/AdmissionsPageEditor';

const AcademicsPageContentEditor = () => {
  return (
    <div className="academics-page-content-editor">
      <h2>Academics Page Content Management</h2>

      <AcademicAchievementsEditor />

      <hr style={{margin: '3rem 0', borderColor: 'var(--muted-color)'}} />

      <AdmissionsPageEditor />

    </div>
  );
};

export default AcademicsPageContentEditor;

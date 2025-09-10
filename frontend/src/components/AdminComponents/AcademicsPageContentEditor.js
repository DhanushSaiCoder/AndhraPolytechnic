import React from 'react';
import AcademicAchievementsEditor from './AcademicsPageEditors/AcademicAchievementsEditor';
import AdmissionsPageEditor from './AcademicsPageEditors/AdmissionsPageEditor';
import './AdminEditors.css';

const AcademicsPageContentEditor = () => {
  return (
    <div className="editor-container">
      <h2 className="editor-container-title">Academics Page Content Management</h2>

      <AcademicAchievementsEditor />

      <div className="editor-separator"></div>

      <AdmissionsPageEditor />

    </div>
  );
};

export default AcademicsPageContentEditor;

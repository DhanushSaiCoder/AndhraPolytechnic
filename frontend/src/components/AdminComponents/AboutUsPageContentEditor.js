import React from 'react';
import AboutUsAchievementsEditor from './AboutUsPageEditors/AboutUsAchievementsEditor';
import AboutUsContactEditor from './AboutUsPageEditors/AboutUsContactEditor';
import './AdminEditors.css';

const AboutUsPageContentEditor = () => {
  return (
    <div className="editor-container">
      <h2 className="editor-container-title">About Us Page Content Management</h2>

      <AboutUsAchievementsEditor />

      <div className="editor-separator"></div>

      <AboutUsContactEditor />

    </div>
  );
};

export default AboutUsPageContentEditor;

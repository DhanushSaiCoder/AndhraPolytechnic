import React from 'react';
import AboutUsAchievementsEditor from './AboutUsPageEditors/AboutUsAchievementsEditor';
import AboutUsContactEditor from './AboutUsPageEditors/AboutUsContactEditor';

const AboutUsPageContentEditor = () => {
  return (
    <div className="about-us-page-content-editor">
      <h2>About Us Page Content Management</h2>

      <AboutUsAchievementsEditor />

      <hr style={{margin: '3rem 0', borderColor: 'var(--muted-color)'}} />

      <AboutUsContactEditor />

    </div>
  );
};

export default AboutUsPageContentEditor;

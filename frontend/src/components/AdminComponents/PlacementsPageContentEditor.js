import React from 'react';
import PlacementHeroEditor from './PlacementsPageEditors/PlacementHeroEditor';
import PlacementStatsEditor from './PlacementsPageEditors/PlacementStatsEditor';
import HighestPackagesEditor from './PlacementsPageEditors/HighestPackagesEditor';
import PlacementProcessEditor from './PlacementsPageEditors/PlacementProcessEditor';
import SuccessStoriesEditor from './PlacementsPageEditors/SuccessStoriesEditor';
import TopRecruitersEditor from './PlacementsPageEditors/TopRecruitersEditor';
import PlacementContactEditor from './PlacementsPageEditors/PlacementContactEditor';
import './AdminEditors.css';

const PlacementsPageContentEditor = () => {
  return (
    <div className="editor-container">
      <h2 className="editor-container-title">Placements Page Content Management</h2>

      <PlacementHeroEditor />
      <div className="editor-separator"></div>
      <PlacementStatsEditor />
      <div className="editor-separator"></div>
      <HighestPackagesEditor />
      <div className="editor-separator"></div>
      <PlacementProcessEditor />
      <div className="editor-separator"></div>
      <SuccessStoriesEditor />
      <div className="editor-separator"></div>
      <TopRecruitersEditor />
      <div className="editor-separator"></div>
      <PlacementContactEditor />
    </div>
  );
};

export default PlacementsPageContentEditor;

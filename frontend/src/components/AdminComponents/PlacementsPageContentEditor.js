import React from 'react';
import PlacementHeroEditor from './PlacementsPageEditors/PlacementHeroEditor';
import PlacementStatsEditor from './PlacementsPageEditors/PlacementStatsEditor';
import HighestPackagesEditor from './PlacementsPageEditors/HighestPackagesEditor';
import PlacementProcessEditor from './PlacementsPageEditors/PlacementProcessEditor';
import SuccessStoriesEditor from './PlacementsPageEditors/SuccessStoriesEditor';
import TopRecruitersEditor from './PlacementsPageEditors/TopRecruitersEditor';
import PlacementContactEditor from './PlacementsPageEditors/PlacementContactEditor';

const PlacementsPageContentEditor = () => {
  return (
    <div className="placements-page-content-editor">
      <h2>Placements Page Content Management</h2>

      <PlacementHeroEditor />

      <PlacementStatsEditor />

      <HighestPackagesEditor />

      <PlacementProcessEditor />

      <SuccessStoriesEditor />

      <TopRecruitersEditor />

      <PlacementContactEditor />
    </div>
  );
};

export default PlacementsPageContentEditor;
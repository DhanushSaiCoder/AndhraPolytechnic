import React from 'react';
import PlacementHeroEditor from './PlacementsPageEditors/PlacementHeroEditor'; // New import
import PlacementStatsEditor from './PlacementsPageEditors/PlacementStatsEditor'; // New import
import HighestPackagesEditor from './PlacementsPageEditors/HighestPackagesEditor'; // New import
import PlacementProcessEditor from './PlacementsPageEditors/PlacementProcessEditor'; // New import
import SuccessStoriesEditor from './PlacementsPageEditors/SuccessStoriesEditor'; // New import
import TopRecruitersEditor from './PlacementsPageEditors/TopRecruitersEditor'; // New import
import PlacementContactEditor from './PlacementsPageEditors/PlacementContactEditor'; // New import

const PlacementsPageContentEditor = () => {
  return (
    <div className="placements-page-content-editor">
      <h2>Placements Page Content Management</h2>

      <PlacementHeroEditor /> {/* Render the component */}

      <PlacementHeroEditor /> {/* Render the component */}

      <PlacementStatsEditor /> {/* Render the component */}

      <HighestPackagesEditor /> {/* Render the component */}

      <PlacementProcessEditor /> {/* Render the component */}

      <SuccessStoriesEditor /> {/* Render the component */}

      <TopRecruitersEditor /> {/* Render the component */}

      <PlacementContactEditor /> {/* Render the component */}


    </div>
  );
};

export default PlacementsPageContentEditor;
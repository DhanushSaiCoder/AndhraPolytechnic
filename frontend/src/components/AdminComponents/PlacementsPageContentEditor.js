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
    
    

      <section className="admin-section">
        <h3>Highest Packages Section</h3>
        <p>Manage the details of students who received the highest packages.</p>
        {/* Component for HighestPackages content */}
      </section>

      <section className="admin-section">
        <h3>Placement Process Section</h3>
        <p>Manage the steps involved in the placement process.</p>
        {/* Component for PlacementProcess content */}
      </section>

      <section className="admin-section">
        <h3>Success Stories Section</h3>
        <p>Manage student success stories and testimonials.</p>
        {/* Component for SuccessStories content */}
      </section>

      <section className="admin-section">
        <h3>Top Recruiters Section</h3>
        <p>Manage the list of top recruiting companies and their logos.</p>
        {/* Component for TopRecruiters content */}
      </section>

      <section className="admin-section">
        <h3>Placement Contact Section</h3>
        <p>Manage the contact information for the placement cell.</p>
        {/* Component for PlacementContact content */}
      </section>
    </div>
  );
};

export default PlacementsPageContentEditor;
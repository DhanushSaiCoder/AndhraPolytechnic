import React from 'react';
import UpdatesMarqueeEditor from './HomePageEditors/UpdatesMarqueeEditor';
import NoticeBoardEditor from './HomePageEditors/NoticeBoardEditor'; // New import
import CurrentInfoEditor from './HomePageEditors/CurrentInfoEditor'; // New import
import CollegeGalleryEditor from './HomePageEditors/CollegeGalleryEditor'; // New import

const HomePageContentEditor = () => {
  return (
    <div className="home-page-content-editor">
      <h2>Home Page Content Management</h2>

      <UpdatesMarqueeEditor /> {/* Render the component */}

      <NoticeBoardEditor /> {/* Render the component */}

      <CurrentInfoEditor /> {/* Render the component */}

      <CollegeGalleryEditor /> {/* Render the component */}


      <section className="admin-section">
        <h3>Current Info (Stats) Section</h3>
        <p>Manage the statistics displayed on the homepage (Total Students, Faculty, Placement Rate).</p>
        {/* Component for CurrentInfo content */}
      </section>

      <section className="admin-section">
        <h3>College Gallery Section</h3>
        <p>Manage images and their descriptions in the college gallery.</p>
        {/* Component for CollegeGallery content */}
      </section>
    </div>
    
  );
};

export default HomePageContentEditor;
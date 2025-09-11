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

    </div>
    
  );
};

export default HomePageContentEditor;
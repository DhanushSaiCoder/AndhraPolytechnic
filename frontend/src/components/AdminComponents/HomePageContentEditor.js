import React, { useState } from 'react';

const HomePageContentEditor = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'Andhra Polytechnic',
    subtitle: 'Kakinada, Andhra Pradesh',
    backgroundImage: '/images/aptCampus.jpeg', // Default from HomeHeroSection.js
  });

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHeroContent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleHeroSave = () => {
    // In a real application, this would send data to a backend API
    console.log('Saving Hero Section:', heroContent);
    alert('Hero Section content saved! (Check console for data)');
  };

  const handleHeroCancel = () => {
    // Reset to initial or fetched state
    setHeroContent({
      title: 'Andhra Polytechnic',
      subtitle: 'Kakinada, Andhra Pradesh',
      backgroundImage: '/images/aptCampus.jpeg',
    });
  };

  return (
    <div className="home-page-content-editor">
      <h2>Home Page Sections</h2>

      <section className="admin-section">
        <h3>Hero Section</h3>
        <div className="form-group">
          <label htmlFor="heroTitle">Title</label>
          <input
            type="text"
            id="heroTitle"
            name="title"
            value={heroContent.title}
            onChange={handleHeroChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="heroSubtitle">Subtitle</label>
          <input
            type="text"
            id="heroSubtitle"
            name="subtitle"
            value={heroContent.subtitle}
            onChange={handleHeroChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="heroBackgroundImage">Background Image URL</label>
          <input
            type="text"
            id="heroBackgroundImage"
            name="backgroundImage"
            value={heroContent.backgroundImage}
            onChange={handleHeroChange}
          />
        </div>
        <div className="form-actions">
          <button onClick={handleHeroSave} className="save-btn">Save</button>
          <button onClick={handleHeroCancel} className="cancel-btn">Cancel</button>
        </div>
      </section>

      {/* Placeholder for other sections */}
      <h3>Current Info (Stats)</h3>
      <p>Edit values, labels, and descriptions for statistics.</p>
      <h3>Message From Leaders</h3>
      <p>Edit Commissioner's and Principal's messages, names, roles, and images.</p>
      <h3>College Gallery</h3>
      <p>Add, edit, or remove gallery images with titles and subtitles.</p>
      <h3>Notice Board (News & Notifications)</h3>
      <p>Add, edit, or remove news items and notifications.</p>
    </div>
  );
};

export default HomePageContentEditor;
import React from 'react';
import AlumniHeroSection from '../components/AlumniComponents/AlumniHeroSection';
import AlumniSuccessStories from '../components/AlumniComponents/AlumniSuccessStories';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const AlumniPage = () => {
  return (
    <>
      <AlumniHeroSection />
      <AlumniSuccessStories />
      {/* Add more Alumni sections here */}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default AlumniPage;

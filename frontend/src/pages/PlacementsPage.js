import React from 'react';
import '../../src/styles/PlacementsStyles/Placements.css';
import PlacementsHeroSection from '../components/PlacementsComponents/PlacementsHeroSection';
import PlacementStats from '../components/PlacementsComponents/PlacementStats';
import TopRecruiters from '../components/PlacementsComponents/TopRecruiters';
import SuccessStories from '../components/PlacementsComponents/SuccessStories';
import PlacementProcess from '../components/PlacementsComponents/PlacementProcess';
import PlacementContact from '../components/PlacementsComponents/PlacementContact';

const PlacementsPage = () => {
  return (
    <div className="placements-page">
      <PlacementsHeroSection />
      <PlacementStats />
      <TopRecruiters />
      <SuccessStories />
      <PlacementProcess />
      <PlacementContact />
    </div>
  );
};

export default PlacementsPage;

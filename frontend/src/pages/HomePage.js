//home page
import React from 'react';
import '../styles/HomeStyles/Home.css';
import HomeHeroSection from '../components/HomeComponents/HomeHeroSection';
import NoticeBoard from './../components/HomeComponents/NoticeBoard';
import CommissionerMessage from './../components/HomeComponents/CommissionerMessage';
import PrincipalMessage from '../components/HomeComponents/PrincipalMessage';
import CurrentInfo from '../components/HomeComponents/CurrentInfo';
import MessageFromLeaders from './../components/HomeComponents/MessageFromLeaders';
import CollegeGallery from './../components/HomeComponents/CollegeGallery';
import ImageSlider from '../components/HomeComponents/ImageSlider';
import Departments from '../components/HomeComponents/Departments';
import AboutUsHeroSection from '../components/AboutUsComponents/AboutUsHeroSection'

export default function HomePage() {
  return (
    <div className='Home'>
      <AboutUsHeroSection />
      <NoticeBoard />
      <MessageFromLeaders />
      <CurrentInfo />
      <Departments />
      <CollegeGallery />
    </div>)
}

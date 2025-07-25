//home page
import React from 'react';
import '../styles/HomeStyles/Home.css';
import HeroSection from '../components/homeComponents/HeroSection';
import NoticeBoard from './../components/homeComponents/NoticeBoard';
import CommissionerMessage from './../components/homeComponents/CommissionerMessage';
import PrincipalMessage from '../components/homeComponents/PrincipalMessage';
import CurrentInfo from '../components/homeComponents/CurrentInfo';
import MessageFromLeaders from './../components/homeComponents/MessageFromLeaders';
import CollegeGallery from './../components/homeComponents/CollegeGallery';
import ImageSlider from '../components/homeComponents/ImageSlider';
import Departments from '../components/homeComponents/Departments';


export default function Home() {
  return (
    <div className='Home'>
      {/* <HeroSection /> */}
      <NoticeBoard />
      <MessageFromLeaders />
      <CurrentInfo />
      <Departments />
      <CollegeGallery />
    </div>)
}
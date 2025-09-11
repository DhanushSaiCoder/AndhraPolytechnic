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
import Hero from '../components/Hero';
import UpdatesMarquee from '../components/HomeComponents/UpdatesMarquee';

import aptCampus from '../images/aptCampus.jpeg';
import aptImg from '../images/aptImg.png';
import aptCampus2 from '../images/aptCampus2.webp';
import aptCampus3 from '../images/aptCampus3.jpg';
import aptStudents from '../images/aptStudents.webp';

const slides = [
  // {
  //   id: 's1',
  //   image: aptCampus,
  //   image2x: aptCampus,
  //   alt: 'Andhra Polytechnic Campus View',
  // },
  {
    id: 's2',
    image: aptImg,
    image2x: aptImg,
    alt: 'Andhra Polytechnic Building',
  }
  ,
  {
    id: 's5',
    image: aptStudents,
    image2x: aptStudents,
    alt: 'Andhra Polytechnic Campus View',
  },
  {
    id: 's3',
    image: aptCampus2,
    image2x: aptCampus2,
    alt: 'Andhra Polytechnic Campus View',
  },
  {
    id: 's4',
    image: aptCampus3,
    image2x: aptCampus3,
    alt: 'Andhra Polytechnic Building',
  }

];

export default function HomePage() {
  return (
    <div className='Home'>
      <Hero slides={slides} />
      <UpdatesMarquee />
      <NoticeBoard />
      <MessageFromLeaders />
      <CurrentInfo />
      <Departments />
      <CollegeGallery />
    </div>)
}

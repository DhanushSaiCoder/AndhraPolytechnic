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
import Hero from '../components/Hero';
import UpdatesMarquee from '../components/HomeComponents/UpdatesMarquee';

const slides = [
  {
    id: 's1',
    image: 'https://picsum.photos/seed/picsum1/1920/1080',
    image2x: 'https://picsum.photos/seed/picsum1/1920/1080',
    alt: 'Random placeholder image from Lorem Picsum',
  },
  {
    id: 's2',
    image: 'https://picsum.photos/seed/picsum2/1920/1080',
    image2x: 'https://picsum.photos/seed/picsum2/1920/1080',
    alt: 'Random placeholder image from Lorem Picsum',
  },
  {
    id: 's3',
    image: 'https://picsum.photos/seed/picsum3/1920/1080',
    image2x: 'https://picsum.photos/seed/picsum3/1920/1080',
    alt: 'Random placeholder image from Lorem Picsum',
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

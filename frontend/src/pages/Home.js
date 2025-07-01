//home page
import React from 'react';
import '../styles/HomeStyles/Home.css';
import HeroSection from '../components/homeComponents/HeroSection';
import NoticeBoard from './../components/homeComponents/NoticeBoard';
export default function Home() {
  return (
    <div className='Home'>
      <HeroSection />
      <NoticeBoard />
    </div>)
}
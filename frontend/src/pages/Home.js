//home page
import React from 'react';
import '../styles/HomeStyles/Home.css';
import HeroSection from '../components/homeComponents/HeroSection';
import NoticeBoard from './../components/homeComponents/NoticeBoard';
import CommissionerMessage from './../components/homeComponents/CommissionerMessage';
export default function Home() {
  return (
    <div className='Home'>
      <HeroSection />
      <NoticeBoard />
      <CommissionerMessage />
    </div>)
}
import React from 'react'
import HeroSection from '../components/AboutusComponenets/HeroSection'
import LeaderShip from '../components/AboutusComponenets/LeaderShip'
import Timeline from '../components/AboutusComponenets/Timeline'
import Accerditations from '../components/AboutusComponenets/Accerditations'
import ContactSection from '../components/AboutusComponenets/ContactUs'
import Acheivements from '../components/AboutusComponenets/Acheivements'
const About = () => {
  return (
    <div className='About'>
      <HeroSection />
      <Timeline />
      <Accerditations />
      <Acheivements />
      <ContactSection />

    </div>
  )
}

export default About
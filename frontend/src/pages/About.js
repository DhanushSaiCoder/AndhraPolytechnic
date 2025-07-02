import React from 'react'
import HeroSection from '../components/AboutusComponenets/HeroSection'
import LeaderShip from '../components/AboutusComponenets/LeaderShip'
import Accerditations from '../components/AboutusComponenets/Accerditations'
import ContactSection from '../components/AboutusComponenets/ContactUs'

const About = () => {
  return (
    <div className='About'>
      <HeroSection />
      <LeaderShip />
      <Accerditations />
      <ContactSection />
    </div>
  )
}

export default About
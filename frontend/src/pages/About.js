import React from 'react'
import HeroSection from '../components/AboutusComponenets/HeroSection'
import LeaderShip from '../components/AboutusComponenets/LeaderShip'
import Accerditations from '../components/AboutusComponenets/Accerditations'

const About = () => {
  return (
    <div className='About'>
      <HeroSection />
      <LeaderShip />
      <Accerditations />
    </div>
  )
}

export default About
import React from 'react'
import HeroSection from '../components/AboutUsComponents/HeroSection'

import Timeline from '../components/AboutUsComponents/Timeline'
import Accreditations from '../components/AboutUsComponents/Accreditations'
import ContactSection from '../components/AboutUsComponents/ContactUs'
import Achievements from '../components/AboutUsComponents/Achievements'
const AboutPage = () => {
  return (
    <div className='About'>
      <HeroSection />
      <Timeline />
      <Accreditations />
      <Achievements />
      <ContactSection />

    </div>
  )
}

export default AboutPage
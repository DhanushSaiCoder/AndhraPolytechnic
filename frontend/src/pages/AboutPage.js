import React from 'react'
import AboutUsHeroSection from '../components/AboutUsComponents/AboutUsHeroSection'
import Timeline from '../components/AboutUsComponents/Timeline'
import Accreditations from '../components/AboutUsComponents/Accreditations'
import ContactSection from '../components/AboutUsComponents/ContactUs'
import Achievements from '../components/AboutUsComponents/Achievements'
const AboutPage = () => {
  return (
    <div className='About'>
      <AboutUsHeroSection />
      <Timeline />
      <Accreditations />
      <Achievements />
      <ContactSection />

    </div>
  )
}

export default AboutPage
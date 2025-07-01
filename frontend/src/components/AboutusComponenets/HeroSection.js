import React from 'react'
import AptImg from '../../images/aptImg.png'
import '../../styles/AboutUsStyles/HeroSection.css'


const HeroSection = () => {
    return (
        <div className='AbouutUsHeroSection'>
            <div className='AboutClgDiv'>
                <div className='AboutClg'>
                    <h1 className='AboutClgTitle'>About Andhra Polytechnic</h1>
                    <p className='AboutClgNote'><span className='SpanForPara'>Established with a legacy of over 75 years</span>, Andhra Polytechnic stands as a pioneer in technical education. Accredited by NAAC and NBA, the college is renowned for delivering quality education with a strong focus on skill development and industry readiness. With a 75% placement rate, we empower students with practical knowledge, modern facilities, and experienced faculty, shaping them into competent professionals ready for the future.</p>
                </div>
                <div className='clgImg'>
                    <img className='AptImg' src={AptImg} alt="Apt Image" />
                </div>
            </div>
            <div className='KeyStatsTitle'>Key Stats</div>
            <div className='KeyStats'>
                <div className='StudentsEnrollDiv'>
                    <p className='Main'>2000+</p>
                    <p className='MainPara'>Students Enrolled</p>
                </div>
                <div className='StudentsEnrollDiv'>
                    <p className='Main'>7</p>
                    <p className='MainPara'>Courses Offered</p>
                </div>
                <div className='StudentsEnrollDiv'>
                    <p className='Main'>75+</p>
                    <p className='MainPara'>Years of Excellence</p>
                </div>
                <div className='StudentsEnrollDiv'>
                    <p className='Main'>50%</p>
                    <p className='MainPara'>Placement Rate</p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
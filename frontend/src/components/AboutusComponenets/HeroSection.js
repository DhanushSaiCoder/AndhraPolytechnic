import React from 'react';
import '../../styles/AboutUsStyles/HeroSection.css'; // Import the CSS file for styling
import campusImage from '../../images/aptImg.png'; // Import the hero image
const HeroSection = () => {
    return (
        <section className="about-hero">
            <div className="about-hero__container">
                <div className="about-hero__grid">
                    {/* Left Column - Text Content */}
                    <div className="about-hero__content">
                        <div className="about-hero__header">
                            <h1 className="about-hero__title">
                                <span className="about-hero__title--highlight">Andhra</span> Polytechnic
                            </h1>
                            <h2 className="about-hero__subtitle">
                                Pioneering Technical Excellence for Over 75 Years
                            </h2>
                        </div>

                        <div className="about-hero__text">
                            <p>
                                Established with a legacy of over 75 years, Andhra Polytechnic stands as a pioneer in
                                technical education. Accredited by NAAC and NBA, the college is renowned for delivering
                                quality education with a strong focus on skill development and industry readiness.
                            </p>
                            <p>
                                With a 75% placement rate, we empower students with practical knowledge, modern facilities,
                                and experienced faculty, shaping them into competent professionals ready for the future.
                            </p>
                        </div>

                        <div className="about-hero__badges">
                            <span className="badge badge--blue">NAAC Accredited</span>
                            <span className="badge badge--green">NBA Approved</span>
                            <span className="badge badge--purple">75+ Years Legacy</span>
                        </div>
                    </div>

                    {/* Right Column - Hero Image */}
                    <div className="about-hero__image-wrapper">
                        <div className="about-hero__image-container">
                            <img
                                src={campusImage}
                                alt="Andhra Polytechnic Campus - Modern educational facility with students"
                                className="about-hero__image"
                            />
                            <div className="about-hero__image-overlay"></div>
                        </div>
                        <div className="about-hero__circle about-hero__circle--large"></div>
                        <div className="about-hero__circle about-hero__circle--small"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
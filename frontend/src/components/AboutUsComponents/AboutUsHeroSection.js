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
                                Your future is in your hands<br/>We give you the skills to build it.
                            </h2>
                        </div>

                        <div className="about-hero__text">
                            <p>
                                A beacon of technical education since 1946, Andhra Polytechnic College (APT) stands as a testament to enduring quality and future-focused innovation. As the first polytechnic in Andhra Pradesh, our legacy is built on academic excellence, industry relevance, and unwavering student success. We equip students with meticulously designed curriculum and practical expertise through state-of-the-art labs. Our strong industry connections ensure stellar placements, preparing graduates to lead in their fields. Join us at Andhra Polytechnic College, where our proud history illuminates a path toward a brilliant future.
                            </p>
                        </div>

                        <div className="about-hero__badges">
                            <span className="badge badge--purple">75+ Years Legacy</span>
                            <span className="badge badge--blue">NAAC Accredited</span>
                            <span className="badge badge--green">NBA Approved</span>
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
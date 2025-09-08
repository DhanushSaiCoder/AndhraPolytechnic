import React from 'react';
import '../../styles/AlumniStyles/AlumniHeroSection.css';
import { Users } from 'lucide-react'; // Using Users icon for alumni

const AlumniHeroSection = () => {
    return (
        <header className="alumni-hero-section">
            <div className="alumni-badge">
                <Users className="badge-icon" />
                <span className="badge-text">Our Valued Alumni</span>
            </div>
            <h1 className="alumni-title-main">
                Connecting Our   <span className="title-highlight">Alumni<br /> Community</span>
            </h1>
            <p className="alumni-description-main">
                Celebrating the achievements and fostering connections within our alumni community.
            </p>
        </header>
    );
}

export default AlumniHeroSection;

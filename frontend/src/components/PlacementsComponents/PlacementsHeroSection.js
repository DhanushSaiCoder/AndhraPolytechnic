import React from 'react';
import '../../styles/PlacementsStyles/PlacementsHeroSection.css';
import { Briefcase } from 'lucide-react';

const PlacementsHeroSection = () => {
    return (
        <header className="placements-hero-section">
            <div className="placements-badge">
                <Briefcase className="badge-icon" />
                <span className="badge-text">Career Opportunities</span>
            </div>
            <h1 className="placements-title-main">
                Explore our <br /> <span className="title-highlight">Campus Placements</span>
            </h1>
            <p className="placements-description-main">
                Connecting talent with industry leaders for a successful career journey.
            </p>
        </header>
    );
}

export default PlacementsHeroSection;

import React from 'react';
import '../../styles/EventsStyles/EventsHeroSection.css';
import { Calendar } from 'lucide-react';

const EventsHeroSection = () => {
    return (
        <header className="events-hero-section">
            <div className="events-badge">
                <Calendar className="badge-icon" />
                <span className="badge-text">College Happenings</span>
            </div>
            <h1 className="events-title-main">
                Stay Updated with Our College <br /> <span className="title-highlight">Events</span>
            </h1>
            <p className="events-description-main">
                Explore a vibrant calendar of workshops, seminars, cultural fests, and more.
            </p>
        </header>
    );
}

export default EventsHeroSection;
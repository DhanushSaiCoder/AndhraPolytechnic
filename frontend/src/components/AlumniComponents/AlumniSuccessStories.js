import React from 'react';
import '../../styles/AlumniStyles/AlumniSuccessStories.css';
import { Star } from 'lucide-react'; // Using Star icon for success stories

const successStoriesData = [
    {
        id: 1,
        name: "Dr. A.K. Sharma",
        year: "Batch of 1995",
        field: "Aerospace Engineering",
        story: "Dr. Sharma is a leading scientist at ISRO, contributing to multiple successful satellite launches. His foundational knowledge from Andhra Polytechnic was key to his journey.",
        image: "https://picsum.photos/seed/alumni1/150/150"
    },
    {
        id: 2,
        name: "Ms. Priya Singh",
        year: "Batch of 2010",
        field: "Software Development",
        story: "Priya is a Senior Software Engineer at Google, specializing in AI. She credits the practical skills gained here for her rapid career progression.",
        image: "https://picsum.photos/seed/alumni2/150/150"
    },
    {
        id: 3,
        name: "Mr. Rajesh Kumar",
        year: "Batch of 2005",
        field: "Entrepreneurship",
        story: "Rajesh founded 'TechSolutions', a successful IT startup. His entrepreneurial spirit was ignited during his time at the polytechnic.",
        image: "https://picsum.photos/seed/alumni3/150/150"
    },
    {
        id: 4,
        name: "Ms. Kavya Reddy",
        year: "Batch of 2015",
        field: "Civil Engineering",
        story: "Kavya is a project manager for major infrastructure projects across India. Her strong engineering fundamentals were built at our institution.",
        image: "https://picsum.photos/seed/alumni4/150/150"
    }
];

const AlumniSuccessStoryCard = ({ name, year, field, story, image }) => {
    return (
        <div className="alumni-story-card">
            <div className="alumni-story-header">
                <img src={image} alt={name} className="alumni-story-image" />
                <div className="alumni-story-info">
                    <h3 className="alumni-story-name">{name}</h3>
                    <p className="alumni-story-year">{year}</p>
                    <p className="alumni-story-field">{field}</p>
                </div>
            </div>
            <p className="alumni-story-description">{story}</p>
        </div>
    );
};

const AlumniSuccessStories = () => {
    return (
        <section className="alumni-success-stories-section">
            <div className="alumni-success-stories-container">
                <div className="alumni-success-stories-header">
                    <div className="alumni-success-badge">
                        <Star className="badge-icon" />
                        <span className="badge-text">Inspiring Journeys</span>
                    </div>
                    <h2 className="alumni-success-title">
                        Our Alumni: Making a Mark
                    </h2>
                    <p className="alumni-success-description">
                        Read about the remarkable achievements and contributions of our graduates across various fields.
                    </p>
                </div>

                <div className="alumni-stories-grid">
                    {successStoriesData.map(story => (
                        <AlumniSuccessStoryCard key={story.id} {...story} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AlumniSuccessStories;

import React, { useState, useEffect } from 'react';
import '../../styles/AlumniStyles/AlumniSuccessStories.css';
import { Star, Briefcase } from 'lucide-react'; // Using Star icon for success stories
import alumniSuccessStoryService from '../../services/alumniSuccessStoryService';
import { getOptimizedImageUrl } from '../../utils/cloudinaryUtils';

const AlumniSuccessStoryCard = ({ name, year, branch, story, image, company, position }) => {
    return (
        <div className="alumni-story-card">
            <div className="alumni-story-header">
                <img src={getOptimizedImageUrl(image, { w: 100, h: 100 })} alt={name} className="alumni-story-image" />
                <div className="alumni-story-info">
                    <h3 className="alumni-story-name">{name}</h3>
                    <div className="alumni-story-meta">
                        <span>{year}</span>
                        <span>&bull;</span>
                        <span>{branch}</span>
                    </div>
                    {position && company && (
                        <div className="alumni-story-work">
                            <Briefcase size={14} />
                            <span>{position} at <strong>{company}</strong></span>
                        </div>
                    )}
                </div>
            </div>
            <p className="alumni-story-description">{story}</p>
        </div>
    );
};

const AlumniSuccessStories = () => {
    const [successStories, setSuccessStories] = useState([]);

    useEffect(() => {
        alumniSuccessStoryService.getAlumniSuccessStories()
            .then(response => {
                setSuccessStories(response.data);
            })
            .catch(error => {
                console.error('Error fetching alumni success stories:', error);
            });
    }, []);

    return (
        <section className="alumni-success-stories-section">
            <div className="alumni-success-stories-container">
                <div className="alumni-stories-grid">
                    {successStories.map(story => (
                        <AlumniSuccessStoryCard key={story._id} {...story} branch={story.field} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AlumniSuccessStories;
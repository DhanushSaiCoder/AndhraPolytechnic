import React, { useState, useEffect } from 'react';
import '../../styles/PlacementsStyles/SuccessStories.css';
import successStoryService from '../../services/successStoryService'; // Import service
import { getOptimizedImageUrl } from '../../utils/cloudinaryUtils';
import SuccessStoriesSkeleton from './SuccessStoriesSkeleton';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await successStoryService.getSuccessStories();
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching success stories:', error);
        setStories([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return <SuccessStoriesSkeleton />;
  }

  return (
    <section className="success-stories-section">
      <div className="success-stories-container">
        <header className="success-stories-header">
          <h2>Student Success Stories</h2>
          <p>Hear from our alumni who have achieved their career goals</p>
        </header>

        <div className="stories-grid">
          {stories.map((story) => (
            <div key={story._id} className="story-card"> {/* Use _id for key */}
              <div className="story-card-header">
                <img src={getOptimizedImageUrl(story.image, { w: 80, h: 80 })} alt={story.name} className="story-avatar" />
                <div className="story-info">
                  <h3 className="story-name">{story.name}</h3>
                  <p className="story-role">{story.role} at {story.company}</p>
                </div>
              </div>
              <p className="story-quote">"{story.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

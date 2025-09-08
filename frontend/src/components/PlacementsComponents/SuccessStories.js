import React from 'react';
import '../../styles/PlacementsStyles/SuccessStories.css';

const stories = [
  {
    id: 1,
    name: 'John Doe',
    company: 'Tech Solutions',
    role: 'Software Engineer',
    quote: 'The placement cell provided invaluable support, helping me land my dream job. The training and guidance were exceptional.',
    image: 'https://picsum.photos/seed/john/100/100', // Placeholder image
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'Global Innovations',
    role: 'Data Analyst',
    quote: "Thanks to the college's strong industry connections, I secured a fantastic opportunity right after graduation. Highly recommend!",
    image: 'https://picsum.photos/seed/jane/100/100', // Placeholder image
  },
  {
    id: 3,
    name: 'Peter Jones',
    company: 'Future Systems',
    role: 'Hardware Developer',
    quote: 'The practical exposure and career counseling I received were instrumental in my placement. Truly grateful for the experience.',
    image: 'https://picsum.photos/seed/peter/100/100', // Placeholder image
  },
];

const SuccessStories = () => {
  return (
    <section className="success-stories-section">
      <div className="success-stories-container">
        <header className="success-stories-header">
          <h2>Student Success Stories</h2>
          <p>Hear from our alumni who have achieved their career goals</p>
        </header>

        <div className="stories-grid">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <div className="story-card-header">
                <img src={story.image} alt={story.name} className="story-avatar" />
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

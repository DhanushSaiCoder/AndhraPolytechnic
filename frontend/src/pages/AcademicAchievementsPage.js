import React from 'react';
import { Award } from 'lucide-react';
import achievementsData from '../data/academicAcheivements.json';
import '../styles/AcademicsStyles/AcademicAchievementsPage.css';
import ImageSlider from '../components/HomeComponents/ImageSlider';

const AchievementItem = ({ achievement }) => {
  const hasImages = achievement.images && achievement.images.length > 0;

  return (
    <div className={`achievements-page-item ${hasImages ? 'has-slider' : ''}`}>
      <div className="achievement-item-content">
        <div className="achievements-page-item-header">
            <Award className="achievements-page-item-icon" />
            <h3 className="achievements-page-item-title">{achievement.title}</h3>
        </div>
        <p className="achievements-page-item-description">{achievement.description}</p>
      </div>
      {hasImages && (
        <div className="achievements-page-image-slider">
          <ImageSlider slides={achievement.images.map((img, idx) => ({ id: idx, image: img, title: '', subtitle: '' }))} />
        </div>
      )}
    </div>
  );
};

const AcademicAchievementsPage = () => {
  return (
    <div className="achievements-page-container">
      

      <main className="achievements-page-content">
        <section className="achievements-page-category">
          <h2 className="achievements-page-category-title">
            Student Achievements
          </h2>
          <p className="achievements-page-category-description">
            Celebrating the outstanding accomplishments of our talented students.
          </p>
          <div className="achievements-page-list">
            {achievementsData.student.map((achievement, index) => (
              <AchievementItem key={index} achievement={achievement} />
            ))}
          </div>
        </section>

        <section className="achievements-page-category">
          <h2 className="achievements-page-category-title">
            Faculty Achievements
          </h2>
           <p className="achievements-page-category-description">
            Recognizing the dedication and contributions of our esteemed faculty.
          </p>
          <div className="achievements-page-list">
            {achievementsData.faculty.map((achievement, index) => (
              <AchievementItem key={index} achievement={achievement} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AcademicAchievementsPage;

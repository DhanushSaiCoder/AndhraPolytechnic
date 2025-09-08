import React from 'react';
import { Award, User, BookOpen } from 'lucide-react';
import achievementsData from '../data/academicAcheivements.json';
import '../styles/AcademicsStyles/AcademicAchievementsPage.css';
import ImageSlider from '../components/HomeComponents/ImageSlider';

const AchievementItem = ({ achievement }) => (
  <div className="achievements-page-item">
    <div className="achievements-page-item-header">
        <Award className="achievements-page-item-icon" />
        <h3 className="achievements-page-item-title">{achievement.title}</h3>
    </div>
    <p className="achievements-page-item-description">{achievement.description}</p>
    {achievement.images && achievement.images.length > 0 && (
      <div className="achievements-page-image-slider">
        <ImageSlider slides={achievement.images.map((img, idx) => ({ id: idx, image: img, title: '', subtitle: '' }))} />
      </div>
    )}
  </div>
);

const AcademicAchievementsPage = () => {
  return (
    <div className="achievements-page-container">
      <header className="achievements-page-hero">
        <div className="achievements-page-badge">
          <Award className="badge-icon" />
          <span className="badge-text">Our Excellence</span>
        </div>
        <h1 className="achievements-page-title">
          Celebrating <span className="title-highlight">Success</span>
        </h1>
        <p className="achievements-page-description">
          We take pride in the remarkable achievements of our students and faculty who inspire excellence.
        </p>
      </header>

      <main className="achievements-page-content">
        <section className="achievements-page-category">
          <div className="achievements-page-category-title-wrapper">
            <h2 className="achievements-page-category-title">
              <User className="category-icon" />
              Student Achievements
            </h2>
          </div>
          <div className="achievements-page-list">
            {achievementsData.student.map((achievement, index) => (
              <AchievementItem key={index} achievement={achievement} />
            ))}
          </div>
        </section>

        <section className="achievements-page-category">
          <div className="achievements-page-category-title-wrapper">
            <h2 className="achievements-page-category-title">
              <BookOpen className="category-icon" />
              Faculty Achievements
            </h2>
          </div>
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
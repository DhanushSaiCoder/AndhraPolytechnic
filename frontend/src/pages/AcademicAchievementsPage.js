import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import academicAchievementService from '../services/academicAchievementService';
import '../styles/AcademicsStyles/AcademicAchievementsPage.css';
import ImageSlider from '../components/HomeComponents/ImageSlider';
import { getOptimizedImageUrl } from '../utils/cloudinaryUtils';
import AchievementItemSkeleton from '../components/AcademicsComponents/AchievementItemSkeleton';

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
          <ImageSlider slides={achievement.images.map((img, idx) => ({ id: idx, image: getOptimizedImageUrl(img, { w: 1200, h: 800 }), title: '', subtitle: '' }))} />
        </div>
      )}
    </div>
  );
};

const AcademicAchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await academicAchievementService.getAcademicAchievements();
        setAchievements(response.data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const studentAchievements = achievements.filter(a => a.category === 'student');
  const facultyAchievements = achievements.filter(a => a.category === 'faculty');

  if (loading) {
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
              <AchievementItemSkeleton />
              <AchievementItemSkeleton />
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
              <AchievementItemSkeleton />
            </div>
          </section>
        </main>
      </div>
    );
  }

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
            {studentAchievements.map((achievement, index) => (
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
            {facultyAchievements.map((achievement, index) => (
              <AchievementItem key={index} achievement={achievement} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AcademicAchievementsPage;

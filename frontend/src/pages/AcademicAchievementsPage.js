import React from 'react';
import ImageSlider from '../components/HomeComponents/ImageSlider'; // Assuming this is the correct path
import achievementsData from '../data/achievementsData';

const AcademicAchievementsPage = () => {
  return (
    <div className="academic-achievements-page">
      <h1>Academic Achievements</h1>

      <section className="student-achievements">
        <h2>Student Achievements</h2>
        {achievementsData.student.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
            {achievement.images && achievement.images.length > 0 && (
              <ImageSlider slides={achievement.images.map((img, idx) => ({ id: idx, image: img, title: '', subtitle: '' }))} />
            )}
          </div>
        ))}
      </section>

      <section className="faculty-achievements">
        <h2>Faculty Achievements</h2>
        {achievementsData.faculty.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
            {achievement.images && achievement.images.length > 0 && (
              <ImageSlider slides={achievement.images.map((img, idx) => ({ id: idx, image: img, title: '', subtitle: '' }))} />
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default AcademicAchievementsPage;

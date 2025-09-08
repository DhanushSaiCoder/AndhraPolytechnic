import React from 'react';
import '../../styles/AcademicsStyles/AcademicAchievements.css'; // Assuming this CSS file will be used
import { Award, Trophy, GraduationCap } from 'lucide-react';

const achievementsData = [
    {
        id: 1,
        icon: Award,
        title: "Top Ranks in State Exams",
        description: "Consistently securing top positions in state-level polytechnic examinations."
    },
    {
        id: 2,
        icon: Trophy,
        title: "State Level Project Competitions",
        description: "Students winning accolades in state engineering and innovation contests."
    },
    {
        id: 3,
        icon: GraduationCap,
        title: "High Placement Rates",
        description: "Over 90% of our graduates secure placements in leading industries annually."
    }
];

const AcademicAchievements = () => {
    return (
        <section className="academic-achievements-section">
            <div className="academic-achievements-container">
                <header className="academic-achievements-header">
                    <div className="academic-achievements-badge">
                        <Award className="badge-icon" />
                        <span className="badge-text">Our Milestones</span>
                    </div>
                    <h2 className="academic-achievements-title">
                        Academic Excellence & Achievements
                    </h2>
                    <p className="academic-achievements-description">
                        Highlighting the significant accomplishments of our students and faculty in the academic realm.
                    </p>
                </header>

                <div className="achievements-grid">
                    {achievementsData.map(achievement => {
                        const Icon = achievement.icon;
                        return (
                            <div key={achievement.id} className="achievement-card">
                                <div className="achievement-icon-wrapper">
                                    <Icon className="achievement-icon" />
                                </div>
                                <h3 className="achievement-card-title">{achievement.title}</h3>
                                <p className="achievement-card-description">{achievement.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AcademicAchievements;
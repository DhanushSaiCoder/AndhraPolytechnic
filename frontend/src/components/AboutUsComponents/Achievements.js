import React, { useState, useEffect } from 'react';
import ImageSlider from '../HomeComponents/ImageSlider';
import aboutUsAchievementService from '../../services/aboutUsAchievementService';
import '../../styles/HomeStyles/CollegeGallery.css'; // Adjust the path as necessary

const Acheivements = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await aboutUsAchievementService.getAchievements();
                setAchievements(response.data);
            } catch (error) {
                console.error('Error fetching achievements:', error);
            }
        };

        fetchAchievements();
    }, []);

    return (
        <div className="campus-gallery acheivements">
            <div className="container">
                <div className="header">
                    <h2 className="title acheivementsTitle">Achievements</h2>
                    <p className="subtitle achievementsSubtitle">
                        Discover our learning spaces and student activities
                    </p>
                </div>
                <ImageSlider slides={achievements} />

            </div>
        </div>
    );
};

export default Acheivements;

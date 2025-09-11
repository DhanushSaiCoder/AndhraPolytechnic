import React, { useState, useEffect } from 'react';
import ImageSlider from '../HomeComponents/ImageSlider';
import aboutUsAchievementService from '../../services/aboutUsAchievementService';
import '../../styles/HomeStyles/CollegeGallery.css'; // Adjust the path as necessary
import { getOptimizedImageUrl } from '../../utils/cloudinaryUtils';

const Acheivements = () => {
    const [achievements, setAchievements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            setIsLoading(true);
            try {
                const response = await aboutUsAchievementService.getAchievements();
                const formattedAchievements = response.data.map(achievement => ({
                    ...achievement,
                    id: achievement._id,
                    image: getOptimizedImageUrl(achievement.image, { w: 1200, h: 800 })
                }));
                setAchievements(formattedAchievements);
            } catch (error) {
                console.error('Error fetching achievements:', error);
            } finally {
                setIsLoading(false);
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
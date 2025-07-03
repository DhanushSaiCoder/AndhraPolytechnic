import React from 'react';
import ImageSlider from '../homeComponents/ImageSlider';
import '../../styles/HomeStyles/CollegeGallery.css'; // Adjust the path as necessary

const achievements = [
    {
        id: 1,
        image: "https://picsum.photos/1200/600?random=7",
        title: "National Level Robotics Championship",
        subtitle: "Won first place among 150+ colleges in 2023"
    },
    {
        id: 2,
        image: "https://picsum.photos/1200/600?random=8",
        title: "AICTE Best Polytechnic Award",
        subtitle: "Recognized for excellence in technical education in 2022"
    },
    {
        id: 3,
        image: "https://picsum.photos/1200/600?random=9",
        title: "Green Campus Award",
        subtitle: "Awarded for sustainable campus initiatives and green practices"
    },
    {
        id: 4,
        image: "https://picsum.photos/1200/600?random=10",
        title: "Startup Incubation Success",
        subtitle: "Incubated 20+ student-led startups over the past five years"
    },
    {
        id: 5,
        image: "https://picsum.photos/1200/600?random=11",
        title: "National Sports Meet Champions",
        subtitle: "Secured overall championship in the inter-polytechnic sports meet 2023"
    },
    {
        id: 6,
        image: "https://picsum.photos/1200/600?random=12",
        title: "Technical Paper Presentations",
        subtitle: "Students presented 50+ papers at national and international conferences"
    }
];



const Acheivements = () => {
    return (
        <div className="campus-gallery acheivements">
            <div className="container">
                <div className="header">
                    <h2 className="title acheivementsTitle">Acheivements</h2>
                    <p className="subtitle acheivementsSubtitle">
                        Discover our learning spaces and student activities
                    </p>
                </div>
                <ImageSlider slides={achievements} />

            </div>
        </div>
    );
};

export default Acheivements;

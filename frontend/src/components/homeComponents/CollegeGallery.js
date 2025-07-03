import React from 'react';
import ImageSlider from './ImageSlider';
import '../../styles/HomeStyles/CollegeGallery.css'; // Adjust the path as necessary

const slides = [
  { id: 1, image: "https://picsum.photos/1200/600?random=1", title: "Main Academic Block", subtitle: "Historic architecture housing modern education since 1952" },
  { id: 2, image: "https://picsum.photos/1200/600?random=2", title: "Innovation Laboratory", subtitle: "State-of-the-art equipment for hands-on technical learning" },
  { id: 3, image: "https://picsum.photos/1200/600?random=3", title: "Central Library", subtitle: "Extensive collection of technical books and digital resources" },
  { id: 4, image: "https://picsum.photos/1200/600?random=4", title: "Campus Grounds", subtitle: "Spacious green campus promoting student well-being" },
  { id: 5, image: "https://picsum.photos/1200/600?random=5", title: "Cultural Activities", subtitle: "Vibrant student life with festivals and competitions" },
  { id: 6, image: "https://picsum.photos/1200/600?random=6", title: "Engineering Workshop", subtitle: "Advanced machinery for practical engineering experience" }
];


const CollegeGallery = () => {
  return (
    <div className="campus-gallery">
      <div className="container">
        <div className="header">
          <h2 className="title">Campus Gallery</h2>
          <p className="subtitle">
            Discover our learning spaces and student activities
          </p>
        </div>
        <ImageSlider slides={slides} />

      </div>
    </div>
  );
};

export default CollegeGallery;

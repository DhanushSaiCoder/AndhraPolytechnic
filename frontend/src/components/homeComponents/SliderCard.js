import React from "react";
import "../../styles/HomeStyles/SliderCard.css";

const SliderCard = ({ image }) => {
  return (
    <div className="slider-card">
      <div 
        className="background"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="gradient-overlay" />
      </div>
     
      <div className="corner-accent">
        <div className="corner-dot" />
      </div>
    </div>
  );
};

export default SliderCard;
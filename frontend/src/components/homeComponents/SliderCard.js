import React, { useState, useEffect } from "react";
import "../../styles/HomeStyles/SliderCard.css";

const SliderCard = ({ image }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [image]);

  return (
    <div className="slider-card">
      {!imageLoaded && <div className="skeleton-loader"></div>}
      <div 
        className={`background ${imageLoaded ? 'loaded' : ''}`}
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
import React from 'react';
import '../../styles/DepartmentsStyles/LabCarousel.css';

const LabCarousel = ({ labs }) => {
  if (!labs || labs.length === 0) {
    return <p>No labs to display.</p>;
  }

  return (
    <div className="lab-carousel">
      {labs.map((lab, index) => (
        <div key={index} className="lab-card">
          <h3>{lab.name}</h3>
          <p>{lab.description}</p>
        </div>
      ))}
    </div>
  );
};

export default LabCarousel;
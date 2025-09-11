import React, { useState, useEffect } from 'react';
import '../../styles/PlacementsStyles/TopRecruiters.css';
import recruiterService from '../../services/recruiterService'; // Import service
import { getOptimizedImageUrl } from '../../utils/cloudinaryUtils';

const TopRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await recruiterService.getRecruiters();
        setRecruiters(response.data);
      } catch (error) {
        console.error('Error fetching recruiters:', error);
        setRecruiters([]); // Set empty array on error
      }
    };

    fetchRecruiters();
  }, []);

  return (
    <section className="top-recruiters-section">
      <div className="top-recruiters-container">
        <header className="top-recruiters-header">
          <h2>Our Top Recruiters</h2>
          <p>Proudly partnering with leading companies to shape student careers</p>
        </header>

        <div className="recruiters-scroll-container">
          <div className="recruiters-track">
            {recruiters.map((recruiter) => (
              <div key={recruiter._id} className="recruiter-item"> {/* Use _id for key */}
                <img src={getOptimizedImageUrl(recruiter.logo, { h: 80 })} alt={recruiter.name} className="recruiter-logo" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {recruiters.map((recruiter) => (
              <div key={`dup-${recruiter._id}`} className="recruiter-item"> {/* Use _id for key */}
                <img src={getOptimizedImageUrl(recruiter.logo, { h: 80 })} alt={recruiter.name} className="recruiter-logo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRecruiters;

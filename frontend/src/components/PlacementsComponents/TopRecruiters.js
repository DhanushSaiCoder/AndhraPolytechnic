import React from 'react';
import '../../styles/PlacementsStyles/TopRecruiters.css';

// Placeholder images for company logos
import company1 from '../../images/apGovt.png'; 
import company2 from '../../images/NBA.png';
import company3 from '../../images/Aicte.png';
import company4 from '../../images/sbtetLogo.jpeg';

const recruiters = [
  { id: 1, name: 'Company A', logo: company1 },
  { id: 2, name: 'Company B', logo: company2 },
  { id: 3, name: 'Company C', logo: company3 },
  { id: 4, name: 'Company D', logo: company4 },
  { id: 5, name: 'Company E', logo: company1 },
  { id: 6, name: 'Company F', logo: company2 },
  { id: 7, name: 'Company G', logo: company3 },
  { id: 8, name: 'Company H', logo: company4 },
];

const TopRecruiters = () => {
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
              <div key={recruiter.id} className="recruiter-item">
                <img src={recruiter.logo} alt={recruiter.name} className="recruiter-logo" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {recruiters.map((recruiter) => (
              <div key={`dup-${recruiter.id}`} className="recruiter-item">
                <img src={recruiter.logo} alt={recruiter.name} className="recruiter-logo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRecruiters;

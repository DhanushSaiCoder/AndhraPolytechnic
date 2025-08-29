import React from 'react';
import '../../styles/AboutUsStyles/Accreditations.css'; // Adjust the path as necessary
import aicteLogo from '../../images/Aicte.png'; // Example logo import, adjust path as necessary
import nbaLogo from '../../images/NBA.png';


const Accreditations = () => {
  const accreditations = [
    {
      name: 'AICTE',
      logo: aicteLogo,
      alt: 'AICTE Accreditation Logo',
      description: 'Approved by the All India Council for Technical Education.'
    },
    {
      name: 'NBA',
      logo: nbaLogo,
      alt: 'NBA Accreditation Logo',
      description: 'Accredited by the National Board of Accreditation.'
    }
  ];

  return (
    <section className="accreditations-section">
      <div className="accreditations-container">
        <div className="accreditations-header">
          <h2 className="accreditations-title">Our Accreditations</h2>
          <p className="accreditations-subtitle">
            We are proud to be recognized by the following prestigious bodies, a testament to our commitment to academic excellence.
          </p>
        </div>
        <div className="accreditations-grid">
          {accreditations.map((accreditation) => (
            <div
              key={accreditation.name}
              className="accreditation-card"
              role="listitem"
              aria-label={`${accreditation.name} Accreditation`}
            >
              <div className="accreditation-logo-container">
                <img
                  src={accreditation.logo}
                  alt={accreditation.alt}
                  className="accreditation-logo"
                />
              </div>
              <div className="accreditation-content">
                <h3 className="accreditation-name">{accreditation.name}</h3>
                <p className="accreditation-description">{accreditation.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accreditations;

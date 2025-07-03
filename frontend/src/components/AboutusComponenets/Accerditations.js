import React from 'react';
import '../../styles/AboutUsStyles/Accreditations.css'; // Adjust the path as necessary
import aicteLogo from '../../images/Aicte.png'; // Example logo import, adjust path as necessary
import nbaLogo from '../../images/NBA.png';


const Accreditations = () => {
  const accreditations = [
    {
      name: 'AICTE',
      logo: aicteLogo,
      alt: 'AICTE Accreditation Logo'
    },
    {
      name: 'NBA',
      logo: nbaLogo,
      alt: 'NBA Accreditation Logo'
    }
  ];

  return (
    <section className="accreditations-section">
      <div className="accreditations-container">
        <h2 className="accreditations-title">Accreditations</h2>
        <div className="accreditations-grid">
          {accreditations.map((accreditation) => (
            <div
              key={accreditation.name}
              className="accreditation-item group"
              role="listitem"
              aria-label={`${accreditation.name} Accreditation`}
            >
              <div className="accreditation-card">
                <div className="accreditation-logo">
                  <img
                    src={accreditation.logo}
                    alt={accreditation.alt}
                    className="logo-img"
                  />
                </div>
              </div>
              <p className="accreditation-caption">{accreditation.name}</p>
            </div>
          ))}
        </div>
        <div className="accreditations-trust">
          <p>
            Our accreditations reflect our commitment to maintaining the highest standards
            in technical education and ensuring quality learning experiences for all students.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Accreditations;

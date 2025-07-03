import React from 'react';
import '../../styles/AboutUsStyles/Accreditations.css'; // Adjust the path as necessary

const Accreditations = () => {
  const accreditations = [
    {
      name: 'AICTE',
      logo: '/lovable-uploads/98c231e0-1d42-4410-99bd-45ee797d5267.png',
      alt: 'AICTE Accreditation Logo'
    },
    {
      name: 'NBA',
      logo: '/lovable-uploads/98c231e0-1d42-4410-99bd-45ee797d5267.png',
      alt: 'NBA Accreditation Logo'
    },
    {
      name: 'NAAC',
      logo: '/lovable-uploads/98c231e0-1d42-4410-99bd-45ee797d5267.png',
      alt: 'NAAC Accreditation Logo'
    },
    {
      name: 'ISO',
      logo: '/lovable-uploads/98c231e0-1d42-4410-99bd-45ee797d5267.png',
      alt: 'ISO Certification Logo'
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

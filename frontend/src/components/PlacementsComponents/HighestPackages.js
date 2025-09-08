import React from 'react';
import '../../styles/PlacementsStyles/HighestPackages.css';

const studentPackages = [
  {
    id: 1,
    name: 'Alice Johnson',
    department: 'Computer Engineering',
    package: '12 LPA',
    company: 'Tech Innovators',
    year: 2024,
    image: 'https://picsum.photos/seed/alice/100/100',
  },
  {
    id: 2,
    name: 'Bob Williams',
    department: 'Electronics Engineering',
    package: '10 LPA',
    company: 'ElectroCorp',
    year: 2024,
    image: 'https://picsum.photos/seed/bob/100/100',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    department: 'Mechanical Engineering',
    package: '9.5 LPA',
    company: 'Mech Solutions',
    year: 2024,
    image: 'https://picsum.photos/seed/charlie/100/100',
  },
];

const HighestPackages = () => {
  return (
    <section className="highest-packages-section">
      <div className="highest-packages-container">
        <header className="highest-packages-header">
          <h2>Our Highest Packages</h2>
          <p>Celebrating the success of our top-achieving students</p>
        </header>

        <div className="package-cards-grid">
          {studentPackages.map((student) => (
            <div key={student.id} className="package-card">
              <img src={student.image} alt={student.name} className="student-avatar" />
              <h3 className="student-name">{student.name}</h3>
              <p className="student-department">{student.department}</p>
              <div className="package-details">
                <span className="package-value">{student.package}</span>
                <span className="company-name">{student.company}</span>
              </div>
              <p className="package-year">Batch of {student.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighestPackages;

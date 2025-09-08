import React from 'react';
import '../../styles/PlacementsStyles/PlacementProcess.css';

const steps = [
  {
    id: 1,
    title: 'Registration',
    description: 'Students register with the Placement Cell, providing their academic details and career preferences.',
  },
  {
    id: 2,
    title: 'Pre-Placement Training',
    description: 'Workshops and training sessions are conducted to enhance soft skills, aptitude, and technical knowledge.',
  },
  {
    id: 3,
    title: 'Company Presentations',
    description: 'Recruiting companies visit the campus to give presentations about their organization and job profiles.',
  },
  {
    id: 4,
    title: 'Aptitude Tests & Group Discussions',
    description: 'Candidates undergo aptitude tests and participate in group discussions to assess their problem-solving and communication skills.',
  },
  {
    id: 5,
    title: 'Technical & HR Interviews',
    description: 'Shortlisted candidates face technical and HR interviews conducted by company representatives.',
  },
  {
    id: 6,
    title: 'Offer & Acceptance',
    description: 'Successful candidates receive job offers, and upon acceptance, they are onboarded by the respective companies.',
  },
];

const PlacementProcess = () => {
  return (
    <section className="placement-process-section">
      <div className="placement-process-container">
        <header className="placement-process-header">
          <h2>Our Placement Process</h2>
          <p>A step-by-step guide to securing your dream career</p>
        </header>

        <div className="process-steps">
          {steps.map((step) => (
            <div key={step.id} className="process-step-card">
              <div className="step-number">{step.id}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementProcess;

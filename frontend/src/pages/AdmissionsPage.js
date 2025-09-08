import React from 'react';
import { FileText, CheckSquare, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/AcademicsStyles/Admissions.css';

const AdmissionProcessStep = ({ icon, title, description }) => (
  <div className="admission-step-card">
    <div className="admission-step-icon-wrapper">{icon}</div>
    <h3 className="admission-step-title">{title}</h3>
    <p className="admission-step-description">{description}</p>
  </div>
);

const AdmissionsPage = () => {
  const processSteps = [
    {
      icon: <FileText />,
      title: 'Online Application',
      description: 'Submit your application through our online portal with all required documents.',
    },
    {
      icon: <CheckSquare />,
      title: 'Entrance Examination',
      description: 'Appear for the state-level entrance test as per the scheduled dates.',
    },
    {
      icon: <Calendar />,
      title: 'Counseling & Verification',
      description: 'Attend counseling and document verification sessions based on your rank.',
    },
    {
      icon: <MapPin />,
      title: 'Enrollment & Fee Payment',
      description: 'Complete the enrollment process by paying the prescribed fees.',
    },
  ];

  return (
    <div className="admissions-page-container">
      <header className="admissions-page-hero">
        <div className="admissions-page-badge">
          <FileText className="badge-icon" />
          <span className="badge-text">Admissions 2024-2025</span>
        </div>
        <h1 className="admissions-page-title">
          Join Our <span className="title-highlight">Community</span>
        </h1>
        <p className="admissions-page-description">
          Begin your journey towards a successful career in technology and engineering.
        </p>
      </header>

      <main className="admissions-page-content">
        <section className="admission-section">
          <h2 className="admission-section-title">Admission Process</h2>
          <p className="admission-section-subtitle">A clear and simple path to becoming a student at our institution.</p>
          <div className="admission-process-grid">
            {processSteps.map((step, index) => (
              <AdmissionProcessStep key={index} {...step} />
            ))}
          </div>
        </section>

        <section className="admission-section">
            <div className="admission-info-grid">
                <div className="admission-info-card">
                    <h3 className="admission-info-title">Eligibility Criteria</h3>
                    <ul className="admission-info-list">
                        <li>Passed 10th Standard/SSC Examination.</li>
                        <li>Obtained at least 35% marks in the qualifying examination.</li>
                        <li>Appeared for the state-level POLYCET entrance examination.</li>
                        <li>Must be a citizen of India.</li>
                    </ul>
                </div>
                <div className="admission-info-card">
                    <h3 className="admission-info-title">Important Dates</h3>
                    <ul className="admission-info-list">
                        <li><strong>Application Start:</strong> March 15, 2024</li>
                        <li><strong>Application Deadline:</strong> April 30, 2024</li>
                        <li><strong>Entrance Exam (POLYCET):</strong> May 15, 2024</li>
                        <li><strong>Counseling Starts:</strong> June 10, 2024</li>
                    </ul>
                </div>
            </div>
        </section>

        <section className="admission-section admission-contact-section">
            <h2 className="admission-section-title">Contact Admissions</h2>
            <p className="admission-section-subtitle">We are here to help you with any questions about the admission process.</p>
            <div className="admission-contact-grid">
                <div className="admission-contact-card">
                    <Mail size={28} className="admission-contact-icon" />
                    <h3 className="admission-contact-title">Email Us</h3>
                    <p>admissions@andhrapolytechnic.ac.in</p>
                </div>
                <div className="admission-contact-card">
                    <Phone size={28} className="admission-contact-icon" />
                    <h3 className="admission-contact-title">Call Us</h3>
                    <p>+91-9876543210</p>
                </div>
                <div className="admission-contact-card">
                    <MapPin size={28} className="admission-contact-icon" />
                    <h3 className="admission-contact-title">Visit Us</h3>
                    <p>Andhra Polytechnic College, Kakinada</p>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default AdmissionsPage;
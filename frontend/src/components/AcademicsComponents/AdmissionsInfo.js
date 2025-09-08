import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AcademicsStyles/AdmissionsInfo.css'; // Assuming this CSS file will be used
import { BookOpen, CalendarDays, FileText } from 'lucide-react';

const AdmissionsInfo = () => {
  return (
    <section className="admissions-info-section">
      <div className="admissions-info-container">
        <header className="admissions-info-header">
          <h2 className="admissions-title">
            Admissions at Andhra Polytechnic
          </h2>
          <p className="admissions-description">
            Explore the pathways to join our esteemed institution and begin your journey in technical education.
          </p>
        </header>

        <div className="admissions-content-grid">
          <div className="admissions-card">
            <CalendarDays className="admissions-card-icon" />
            <h3 className="admissions-card-title">Admission Schedule</h3>
            <p className="admissions-card-description">
              Stay updated with important dates for applications, entrance exams, and counseling sessions.
            </p>
          </div>

          <div className="admissions-card">
            <FileText className="admissions-card-icon" />
            <h3 className="admissions-card-title">Eligibility Criteria</h3>
            <p className="admissions-card-description">
              Understand the academic qualifications and requirements for various diploma programs.
            </p>
          </div>

          <div className="admissions-card">
            <BookOpen className="admissions-card-icon" />
            <h3 className="admissions-card-title">Application Process</h3>
            <p className="admissions-card-description">
              A step-by-step guide to successfully complete your online application.
            </p>
          </div>
        </div>

        <footer className="admissions-info-footer">
          <Link to="/academics/admissions" className="learn-more-btn">
            Learn More →
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default AdmissionsInfo;

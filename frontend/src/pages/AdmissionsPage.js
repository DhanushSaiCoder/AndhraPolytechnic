import React, { useState, useEffect } from 'react';
import { FileText, CheckSquare, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import admissionsContentService from '../services/admissionsContentService';
import '../styles/AcademicsStyles/Admissions.css';

const iconMap = {
  FileText: <FileText />,
  CheckSquare: <CheckSquare />,
  Calendar: <Calendar />,
  Mail: <Mail />,
  Phone: <Phone />,
  MapPin: <MapPin />,
};

const AdmissionProcessStep = ({ icon, title, description }) => (
  <div className="admission-step-card">
    <div className="admission-step-icon-wrapper">{iconMap[icon] || <FileText />}</div>
    <h3 className="admission-step-title">{title}</h3>
    <p className="admission-step-description">{description}</p>
  </div>
);

const AdmissionsPage = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await admissionsContentService.getAdmissionsContent();
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching admissions content:', error);
      }
    };

    fetchContent();
  }, []);

  if (!content) {
    return <div>Loading...</div>; // Or a proper loader
  }

  const { processSteps, eligibilityCriteria, importantDates, contact } = content;

  return (
    <div className="admissions-page-container">
      <header className="admissions-page-hero">
        <div className="admissions-page-badge">
          <FileText className="badge-icon" />
          <span className="badge-text">Admissions 2024-2025</span>
        </div>
        <h1 className="admissions-page-title">
          Join Our <span className="title-highlight">College</span>
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
                        {eligibilityCriteria.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="admission-info-card">
                    <h3 className="admission-info-title">Important Dates</h3>
                    <ul className="admission-info-list">
                        {importantDates.map((item, index) => (
                          <li key={index}><strong>{item.title}:</strong>  {item.date}</li>
                        ))}
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
                    <p>{contact?.email || ''}</p>
                </div>
                <div className="admission-contact-card">
                    <Phone size={28} className="admission-contact-icon" />
                    <h3 className="admission-contact-title">Call Us</h3>
                    <p>{contact?.phone || ''}</p>
                </div>
                <div className="admission-contact-card">
                    <MapPin size={28} className="admission-contact-icon" />
                    <h3 className="admission-contact-title">Visit Us</h3>
                    <p>{contact?.address || ''}</p>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default AdmissionsPage;
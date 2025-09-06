import React from 'react';

const AdmissionsPage = () => {
  return (
    <div className="admissions-page">
      <h1>Admissions</h1>

      <section className="eligibility-section">
        <h2>Eligibility Criteria</h2>
        <p>Detailed information about the eligibility requirements for various programs will be provided here.</p>
        <ul>
          <li>Minimum educational qualifications</li>
          <li>Age limits (if any)</li>
          <li>Specific subject requirements</li>
        </ul>
      </section>

      <section className="process-section">
        <h2>Admission Process</h2>
        <p>A step-by-step guide to the admission process, from application to enrollment.</p>
        <ol>
          <li>Online application submission</li>
          <li>Entrance examination details</li>
          <li>Counseling and document verification</li>
          <li>Fee payment</li>
        </ol>
      </section>

      <section className="dates-section">
        <h2>Important Dates</h2>
        <p>Key dates for the upcoming admission cycle.</p>
        <ul>
          <li>Application start date: [Date]</li>
          <li>Application deadline: [Date]</li>
          <li>Entrance exam date: [Date]</li>
          <li>Results announcement: [Date]</li>
          <li>Counseling dates: [Date Range]</li>
        </ul>
      </section>
    </div>
  );
};

export default AdmissionsPage;

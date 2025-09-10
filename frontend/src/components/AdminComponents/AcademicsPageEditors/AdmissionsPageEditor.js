import React, { useState, useEffect } from 'react';
import admissionsContentService from '../../../services/admissionsContentService';
import AdmissionsPageModal from './AdmissionsPageModal'; // Import the new modal

const initialContentState = {
  processSteps: [],
  eligibilityCriteria: [],
  importantDates: [],
  contact: { email: '', phone: '', address: '' },
};

const AdmissionsPageEditor = () => {
  const [content, setContent] = useState(initialContentState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchContent = async () => {
    try {
      const response = await admissionsContentService.getAdmissionsContent();
      if (response.data) {
        setContent(response.data);
      } else {
        setContent(initialContentState); // Reset if no data
      }
    } catch (error) {
      console.error('Error fetching admissions content:', error);
      alert('Failed to fetch admissions content.');
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveContent = async (contentData) => {
    try {
      await admissionsContentService.updateAdmissionsContent(contentData);
      alert('Admissions content updated successfully!');
      fetchContent(); // Re-fetch to ensure UI is updated
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving admissions content:', error);
      alert('Failed to save admissions content.');
    }
  };

  return (
    <section className="admin-section">
      <h3>Admissions Page Content</h3>

      <p><strong>Process Steps:</strong> {content.processSteps.length} steps</p>
      <p><strong>Eligibility Criteria:</strong> {content.eligibilityCriteria.length} items</p>
      <p><strong>Important Dates:</strong> {content.importantDates.length} dates</p>
      <p><strong>Contact Email:</strong> {content.contact?.email || 'N/A'}</p>

      <div className="form-actions">
        <button onClick={handleEditClick} className="save-btn">Edit Admissions Content</button>
      </div>

      <AdmissionsPageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContent}
        contentData={content}
      />
    </section>
  );
};

export default AdmissionsPageEditor;

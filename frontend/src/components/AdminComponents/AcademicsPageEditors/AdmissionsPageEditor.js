import React, { useState, useEffect, useCallback } from 'react';
import admissionsContentService from '../../../services/admissionsContentService';
import AdmissionsPageModal from './AdmissionsPageModal';
import Loader from '../../Loader';

const initialContentState = {
  processSteps: [],
  eligibilityCriteria: [],
  importantDates: [],
  contact: { email: '', phone: '', address: '' },
};

const AdmissionsPageEditor = () => {
  const [content, setContent] = useState(initialContentState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await admissionsContentService.getAdmissionsContent();
      if (response.data) {
        setContent(response.data);
      } else {
        setContent(initialContentState);
      }
    } catch (error) {
      console.error('Error fetching admissions content:', error);
      alert('Failed to fetch admissions content.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveContent = async (contentData) => {
    try {
      await admissionsContentService.updateAdmissionsContent(contentData);
      alert('Admissions content updated successfully!');
      fetchContent();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving admissions content:', error);
      alert('Failed to save admissions content.');
    }
  };

  if (isLoading) {
    return <Loader text="Loading Admissions Content..." />;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>Admissions Page Content</h3>
        <button onClick={handleEditClick} className="btn btn-primary">Edit Admissions Content</button>
      </div>

      <div className="details-view">
        <p><strong>Process Steps:</strong> {content.processSteps.length} steps</p>
        <p><strong>Eligibility Criteria:</strong> {content.eligibilityCriteria.length} items</p>
        <p><strong>Important Dates:</strong> {content.importantDates.length} dates</p>
        <p><strong>Contact Email:</strong> {content.contact?.email || 'N/A'}</p>
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

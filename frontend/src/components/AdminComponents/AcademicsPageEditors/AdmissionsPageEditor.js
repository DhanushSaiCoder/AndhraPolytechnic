import React, { useState, useEffect } from 'react';
import admissionsContentService from '../../../services/admissionsContentService';

const initialContentState = {
  processSteps: [],
  eligibilityCriteria: [],
  importantDates: [],
  contact: { email: '', phone: '', address: '' },
};

const AdmissionsPageEditor = () => {
  const [content, setContent] = useState(initialContentState);

  const fetchContent = async () => {
    try {
      const response = await admissionsContentService.getAdmissionsContent();
      if (response.data) {
        setContent(response.data);
      }
    } catch (error) {
      console.error('Error fetching admissions content:', error);
      alert('Failed to fetch admissions content.');
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...content.processSteps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setContent(prev => ({ ...prev, processSteps: updatedSteps }));
  };

  const handleAddStep = () => {
    setContent(prev => ({ ...prev, processSteps: [...prev.processSteps, { icon: '', title: '', description: '' }] }));
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = content.processSteps.filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, processSteps: updatedSteps }));
  };

  const handleListChange = (field, index, value) => {
    const updatedList = [...content[field]];
    updatedList[index] = value;
    setContent(prev => ({ ...prev, [field]: updatedList }));
  };

  const handleAddListItem = (field) => {
    setContent(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const handleRemoveListItem = (field, index) => {
    const updatedList = content[field].filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, [field]: updatedList }));
  };

  const handleDateChange = (index, field, value) => {
    const updatedDates = [...content.importantDates];
    updatedDates[index] = { ...updatedDates[index], [field]: value };
    setContent(prev => ({ ...prev, importantDates: updatedDates }));
  };

  const handleAddDate = () => {
    setContent(prev => ({ ...prev, importantDates: [...prev.importantDates, { label: '', date: '' }] }));
  };

  const handleRemoveDate = (index) => {
    const updatedDates = content.importantDates.filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, importantDates: updatedDates }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, contact: { ...prev.contact, [name]: value } }));
  };

  const handleSave = async () => {
    try {
      await admissionsContentService.updateAdmissionsContent(content);
      alert('Admissions content updated successfully!');
    } catch (error) {
      console.error('Error saving admissions content:', error);
      alert('Failed to save admissions content.');
    }
  };

  return (
    <section className="admin-section">
      <h3>Admissions Page Content</h3>

      

      {/* Admission Process Steps */}
      <h4>Admission Process Steps</h4>
      {content.processSteps.map((step, index) => (
        <div key={index} className="dynamic-object-item bordered-section">
          <input type="text" value={step.icon} onChange={(e) => handleStepChange(index, 'icon', e.target.value)} placeholder="Icon Name (e.g., FileText)" />
          <input type="text" value={step.title} onChange={(e) => handleStepChange(index, 'title', e.target.value)} placeholder="Step Title" />
          <textarea value={step.description} onChange={(e) => handleStepChange(index, 'description', e.target.value)} placeholder="Step Description"></textarea>
          <button type="button" onClick={() => handleRemoveStep(index)} className="remove-btn">Remove Step</button>
        </div>
      ))}
      <button type="button" onClick={handleAddStep} className="add-btn">Add Step</button>

      {/* Eligibility Criteria */}
      <h4>Eligibility Criteria</h4>
      {content.eligibilityCriteria.map((item, index) => (
        <div key={index} className="dynamic-list-item">
          <input type="text" value={item} onChange={(e) => handleListChange('eligibilityCriteria', index, e.target.value)} placeholder="Eligibility Criterion" />
          <button type="button" onClick={() => handleRemoveListItem('eligibilityCriteria', index)} className="remove-btn">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddListItem('eligibilityCriteria')} className="add-btn">Add Criterion</button>

      {/* Important Dates */}
      <h4>Important Dates</h4>
      {content.importantDates.map((item, index) => (
        <div key={index} className="dynamic-object-item">
          <input type="text" value={item.label} onChange={(e) => handleDateChange(index, 'label', e.target.value)} placeholder="Label (e.g., Application Start)" />
          <input type="text" value={item.date} onChange={(e) => handleDateChange(index, 'date', e.target.value)} placeholder="Date (e.g., March 15, 2024)" />
          <button type="button" onClick={() => handleRemoveDate(index)} className="remove-btn">Remove Date</button>
        </div>
      ))}
      <button type="button" onClick={handleAddDate} className="add-btn">Add Date</button>

      {/* Contact Info */}
      <h4>Contact Information</h4>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={content.contact?.email || ''} onChange={handleContactChange} />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="text" name="phone" value={content.contact?.phone || ''} onChange={handleContactChange} />
      </div>
      <div className="form-group">
        <label>Address</label>
        <textarea name="address" value={content.contact?.address || ''} onChange={handleContactChange}></textarea>
      </div>

      <div className="form-actions">
        <button onClick={handleSave} className="save-btn">Save All Changes</button>
      </div>
    </section>
  );
};

export default AdmissionsPageEditor;

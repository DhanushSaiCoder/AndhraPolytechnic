import React, { useState, useEffect } from 'react';
import placementProcessService from '../../../services/placementProcessService';

const PlacementProcessEditor = () => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState({
    _id: '',
    title: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchSteps = async () => {
    try {
      const response = await placementProcessService.getPlacementProcessSteps();
      setSteps(response.data);
    } catch (error) {
      console.error('Error fetching placement process steps:', error);
      alert('Failed to fetch placement process steps.');
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStep(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddStep = async () => {
    if (currentStep.title.trim() === '' || currentStep.description.trim() === '') return;
    try {
      if (editingId) {
        await placementProcessService.updatePlacementProcessStep(editingId, currentStep);
        alert('Placement Process Step updated successfully!');
      } else {
        await placementProcessService.createPlacementProcessStep(currentStep);
        alert('Placement Process Step added successfully!');
      }
      fetchSteps(); // Re-fetch steps
      setCurrentStep({ _id: '', title: '', description: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving placement process step:', error);
      alert('Failed to save placement process step.');
    }
  };

  const handleEdit = (step) => {
    setCurrentStep(step);
    setEditingId(step._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this placement process step?')) {
      try {
        await placementProcessService.deletePlacementProcessStep(id);
        alert('Placement Process Step deleted successfully!');
        fetchSteps();
      } catch (error) {
        console.error('Error deleting placement process step:', error);
        alert('Failed to delete placement process step.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>Placement Process Content</h3>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={currentStep.title} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={currentStep.description} onChange={handleChange}></textarea>
      </div>

      <div className="form-actions">
        <button onClick={handleAddStep} className="save-btn">{editingId ? 'Save Changes' : 'Add Step'}</button>
        {editingId && <button onClick={() => {setEditingId(null); setCurrentStep({ _id: '', title: '', description: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Placement Process Steps</h4>
      <ul className="admin-list">
        {steps.map(step => (
          <li key={step._id} className="admin-list-item">
            <span>{step.title}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(step)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(step._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlacementProcessEditor;
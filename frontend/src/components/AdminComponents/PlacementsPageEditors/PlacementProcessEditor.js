import React, { useState, useEffect } from 'react';
import placementProcessService from '../../../services/placementProcessService';
import PlacementProcessModal from './PlacementProcessModal'; // Import the new modal

const initialStepState = {
  _id: '',
  title: '',
  description: '',
};

const PlacementProcessEditor = () => {
  const [steps, setSteps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState(null);

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

  const handleAddClick = () => {
    setEditingStep({ ...initialStepState });
    setIsModalOpen(true);
  };

  const handleEditClick = (step) => {
    setEditingStep(step);
    setIsModalOpen(true);
  };

  const handleSaveStep = async (stepData) => {
    try {
      if (stepData._id) {
        await placementProcessService.updatePlacementProcessStep(stepData._id, stepData);
        alert('Placement Process Step updated successfully!');
      } else {
        await placementProcessService.createPlacementProcessStep(stepData);
        alert('Placement Process Step added successfully!');
      }
      fetchSteps();
      setIsModalOpen(false);
      setEditingStep(null);
    } catch (error) {
      console.error('Error saving placement process step:', error);
      alert('Failed to save placement process step.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this step?')) {
      try {
        await placementProcessService.deletePlacementProcessStep(id);
        alert('Placement Process Step deleted successfully!');
        fetchSteps();
      } catch (error) {
        console.error('Error deleting step:', error);
        alert('Failed to delete step.');
      }
    }
  };

  return (
    <section className="admin-section">
      <h3>Placement Process Content</h3>

      <div className="form-actions">
        <button onClick={handleAddClick} className="save-btn">Add New Step</button>
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Placement Process Steps</h4>
      <ul className="admin-list">
        {steps.map(step => (
          <li key={step._id} className="admin-list-item">
            <span>{step.title}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEditClick(step)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(step._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingStep && (
        <PlacementProcessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveStep}
          step={editingStep}
        />
      )}
    </section>
  );
};

export default PlacementProcessEditor;

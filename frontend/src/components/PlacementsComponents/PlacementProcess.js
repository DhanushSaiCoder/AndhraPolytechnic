import React, { useState, useEffect } from 'react';
import '../../styles/PlacementsStyles/PlacementProcess.css';
import placementProcessService from '../../services/placementProcessService'; // Import service
import PlacementProcessSkeleton from './PlacementProcessSkeleton';

const PlacementProcess = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await placementProcessService.getPlacementProcessSteps();
        setSteps(response.data);
      } catch (error) {
        console.error('Error fetching placement process steps:', error);
        setSteps([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  if (loading) {
    return <PlacementProcessSkeleton />;
  }

  return (
    <section className="placement-process-section">
      <div className="placement-process-container">
        <header className="placement-process-header">
          <h2>Our Placement Process</h2>
          <p>A step-by-step guide to securing your dream career</p>
        </header>

        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={step._id} className="process-step-card"> {/* Use _id for key */}
              <div className="step-number">{index +1}</div> {/* Assuming 'id' is still used for display order */}
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

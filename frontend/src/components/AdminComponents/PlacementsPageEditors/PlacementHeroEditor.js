import React, { useState, useEffect } from 'react';
import placementHeroService from '../../../services/placementHeroService';
import PlacementHeroModal from './PlacementHeroModal';

const PlacementHeroEditor = () => {
  const [chartData, setChartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchHeroData = async () => {
    try {
      const response = await placementHeroService.getPlacementHeroData();
      if (response.data && response.data.years && response.data.years.length > 0) {
        const transformedData = response.data.years.map((year, index) => ({
          id: `item-${index}-${Date.now()}`,
          year: year || '',
          students: response.data.students[index] || '',
          avgPackage: response.data.avgPackage[index] || '',
        }));
        setChartData(transformedData);
      } else {
        setChartData([]);
      }
    } catch (error) {
      console.error('Error fetching placement hero data:', error);
      alert('Failed to fetch placement hero data.');
    }
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveChartData = async (dataToSend) => {
    try {
      await placementHeroService.updatePlacementHeroData(dataToSend);
      alert('Placement Hero data saved successfully!');
      fetchHeroData();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving placement hero data:', error);
      alert('Failed to save placement hero data.');
    }
  };

  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h3>Placement Hero Section (Charts)</h3>
        <button onClick={handleEditClick} className="btn btn-primary">Edit Chart Data</button>
      </div>

      <div className="details-view">
        <p><strong>Current Chart Data:</strong></p>
        <ul>
          {chartData.length > 0 ? (
            chartData.map(item => (
              <li key={item.id}>{item.year}: {item.students} students, {item.avgPackage} LPA</li>
            ))
          ) : (
            <li>No chart data available.</li>
          )}
        </ul>
      </div>

      <PlacementHeroModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveChartData}
        chartData={chartData}
      />
    </section>
  );
};

export default PlacementHeroEditor;

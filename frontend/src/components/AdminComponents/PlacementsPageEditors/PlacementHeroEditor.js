import React, { useState, useEffect } from 'react';
import placementHeroService from '../../../services/placementHeroService';

const PlacementHeroEditor = () => {
  const [chartData, setChartData] = useState([]);

  const fetchHeroData = async () => {
    try {
      const response = await placementHeroService.getPlacementHeroData();
      if (response.data && response.data.years && response.data.years.length > 0) {
        const transformedData = response.data.years.map((year, index) => ({
          // Use a unique key for React's rendering list
          id: `item-${index}-${Date.now()}`,
          year: year || '',
          students: response.data.students[index] || '',
          avgPackage: response.data.avgPackage[index] || '',
        }));
        setChartData(transformedData);
      } else {
        setChartData([]); // Handle case with no data
      }
    } catch (error) {
      console.error('Error fetching placement hero data:', error);
      alert('Failed to fetch placement hero data.');
    }
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  const handleChartDataChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = [...chartData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setChartData(updatedData);
  };

  const handleAddRow = () => {
    setChartData([...chartData, { id: `new-${Date.now()}`, year: '', students: '', avgPackage: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedData = chartData.filter((_, i) => i !== index);
    setChartData(updatedData);
  };

  const handleSave = async () => {
    try {
      const dataToSend = {
        years: chartData.map(item => (item.year || '').trim()),
        students: chartData.map(item => Number(item.students) || 0),
        avgPackage: chartData.map(item => Number(item.avgPackage) || 0),
      };

      // Basic validation
      if (dataToSend.years.some(y => y === '')) {
        alert('Please ensure all "Year" fields are filled out.');
        return;
      }

      await placementHeroService.updatePlacementHeroData(dataToSend);
      alert('Placement Hero data saved successfully!');
    } catch (error) {
      console.error('Error saving placement hero data:', error);
      alert('Failed to save placement hero data.');
    }
  };

  const handleCancel = () => {
    fetchHeroData(); // Re-fetch original data
  };

  return (
    <section className="admin-section">
      <h3>Placement Hero Section (Charts)</h3>

      {chartData.map((data, index) => (
        <div key={data.id} className="dynamic-object-item bordered-section">
          <h5 style={{marginBottom: '1rem'}}>Year Entry #{index + 1}</h5>
          <div className="form-group">
            <label>Year</label>
            <input
              type="text"
              name="year"
              value={data.year}
              onChange={(e) => handleChartDataChange(index, e)}
              placeholder="e.g., 2023-24"
            />
          </div>
          <div className="form-group">
            <label>Students Placed</label>
            <input
              type="number"
              name="students"
              value={data.students}
              onChange={(e) => handleChartDataChange(index, e)}
              placeholder="e.g., 450"
            />
          </div>
          <div className="form-group">
            <label>Average Package (LPA)</label>
            <input
              type="number"
              name="avgPackage"
              value={data.avgPackage}
              onChange={(e) => handleChartDataChange(index, e)}
              placeholder="e.g., 4.5"
            />
          </div>
          <button type="button" onClick={() => handleRemoveRow(index)} className="remove-btn">
            Remove Year
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddRow} className="add-btn" style={{ marginTop: '1rem' }}>
        Add Year
      </button>

      <div className="form-actions" style={{ marginTop: '2rem' }}>
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={handleCancel} className="cancel-btn">Cancel</button>
      </div>
    </section>
  );
};

export default PlacementHeroEditor;
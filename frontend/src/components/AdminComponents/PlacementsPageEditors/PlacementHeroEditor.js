import React, { useState, useEffect } from 'react';
import placementHeroService from '../../../services/placementHeroService';

const PlacementHeroEditor = () => {
  const [heroData, setHeroData] = useState({
    years: '',
    students: '',
    avgPackage: '',
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await placementHeroService.getPlacementHeroData();
        if (response.data) {
          setHeroData({
            years: response.data.years.join(', '),
            students: response.data.students.join(', '),
            avgPackage: response.data.avgPackage.join(', '),
          });
        }
      } catch (error) {
        console.error('Error fetching placement hero data:', error);
        alert('Failed to fetch placement hero data.');
      }
    };
    fetchHeroData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const dataToSend = {
        years: heroData.years.split(',').map(item => item.trim()),
        students: heroData.students.split(',').map(Number),
        avgPackage: heroData.avgPackage.split(',').map(Number),
      };
      await placementHeroService.updatePlacementHeroData(dataToSend);
      alert('Placement Hero data saved successfully!');
    } catch (error) {
      console.error('Error saving placement hero data:', error);
      alert('Failed to save placement hero data.');
    }
  };

  const handleCancel = () => {
    // Re-fetch to reset to original state
    const fetchHeroData = async () => {
      try {
        const response = await placementHeroService.getPlacementHeroData();
        if (response.data) {
          setHeroData({
            years: response.data.years.join(', '),
            students: response.data.students.join(', '),
            avgPackage: response.data.avgPackage.join(', '),
          });
        }
      } catch (error) {
        console.error('Error fetching placement hero data:', error);
        alert('Failed to fetch placement hero data.');
      }
    };
    fetchHeroData();
  };

  return (
    <section className="admin-section">
      <h3>Placement Hero Section (Charts)</h3>

      <div className="form-group">
        <label htmlFor="years">Years (comma-separated)</label>
        <input type="text" id="years" name="years" value={heroData.years} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="students">Students Placed (comma-separated numbers)</label>
        <input type="text" id="students" name="students" value={heroData.students} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="avgPackage">Average Package (comma-separated numbers)</label>
        <input type="text" id="avgPackage" name="avgPackage" value={heroData.avgPackage} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={handleCancel} className="cancel-btn">Cancel</button>
      </div>
    </section>
  );
};

export default PlacementHeroEditor;
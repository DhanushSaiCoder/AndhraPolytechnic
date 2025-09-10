import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const PlacementHeroModal = ({ isOpen, onClose, onSave, chartData }) => {
  const [currentChartData, setCurrentChartData] = useState(chartData);

  useEffect(() => {
    setCurrentChartData(chartData);
  }, [chartData]);

  if (!isOpen) return null;

  const handleChartDataChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = [...currentChartData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setCurrentChartData(updatedData);
  };

  const handleAddRow = () => {
    setCurrentChartData([...currentChartData, { id: `new-${Date.now()}`, year: '', students: '', avgPackage: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedData = currentChartData.filter((_, i) => i !== index);
    setCurrentChartData(updatedData);
  };

  const handleSave = () => {
    const dataToSend = {
      years: currentChartData.map(item => (item.year || '').trim()),
      students: currentChartData.map(item => Number(item.students) || 0),
      avgPackage: currentChartData.map(item => Number(item.avgPackage) || 0),
    };

    if (dataToSend.years.some(y => y === '')) {
      alert('Please ensure all "Year" fields are filled out.');
      return;
    }
    onSave(dataToSend);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>Edit Placement Hero Section (Charts)</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="year-entries-container">
            {currentChartData.map((data, index) => (
              <div key={data.id} className="year-entry-row">
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
                      Remove
                  </button>
              </div>
            ))}
          </div>

          <button type="button" onClick={handleAddRow} className="add-btn" style={{ marginTop: '1rem' }}>
            Add Year
          </button>
        </div>
        <div className="editor-modal-footer">
          <button className="se-btn" onClick={onClose}>Cancel</button>
          <button className="se-btn se-btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default PlacementHeroModal;

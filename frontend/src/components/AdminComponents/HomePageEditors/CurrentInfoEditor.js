import React, { useState, useEffect } from 'react';

const CurrentInfoEditor = () => {
  const [stats, setStats] = useState([]);
  const [currentStat, setCurrentStat] = useState({
    id: '',
    icon: '', // e.g., 'Users', 'GraduationCap', 'TrendingUp'
    value: '',
    label: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Simulate fetching data
  useEffect(() => {
    const dummyStats = [
      { id: 's1', icon: 'Users', value: '1200', label: 'Total Students', description: 'Active learners pursuing technical education' },
      { id: 's2', icon: 'GraduationCap', value: '50', label: 'Total Faculty', description: 'Experienced educators and industry experts' },
      { id: 's3', icon: 'TrendingUp', value: '95%', label: 'Placement Rate', description: 'Successful career placement for graduates' },
    ];
    setStats(dummyStats);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStat(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddStat = () => {
    if (currentStat.value.trim() === '' || currentStat.label.trim() === '') return;
    const id = editingId || `s${stats.length + 1}`;
    const updatedList = editingId
      ? stats.map(stat => (stat.id === editingId ? { ...currentStat, id } : stat))
      : [...stats, { ...currentStat, id }];
    setStats(updatedList);
    setCurrentStat({ id: '', icon: '', value: '', label: '', description: '' });
    setEditingId(null);
    alert('Stat saved!');
  };

  const handleEdit = (stat) => {
    setCurrentStat(stat);
    setEditingId(stat.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      setStats(stats.filter(stat => stat.id !== id));
      alert('Stat deleted!');
    }
  };

  return (
    <section className="admin-section">
      <h3>Current Info (Stats) Content</h3>

      <div className="form-group">
        <label htmlFor="statIcon">Icon Name (e.g., Users, GraduationCap)</label>
        <input type="text" id="statIcon" name="icon" value={currentStat.icon} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="statValue">Value</label>
        <input type="text" id="statValue" name="value" value={currentStat.value} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="statLabel">Label</label>
        <input type="text" id="statLabel" name="label" value={currentStat.label} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="statDescription">Description</label>
        <textarea id="statDescription" name="description" value={currentStat.description} onChange={handleChange}></textarea>
      </div>
      <div className="form-actions">
        <button onClick={handleAddStat} className="save-btn">{editingId ? 'Save Changes' : 'Add Stat'}</button>
        {editingId && <button onClick={() => {setEditingId(null); setCurrentStat({ id: '', icon: '', value: '', label: '', description: '' });}} className="cancel-btn">Cancel Edit</button>}
      </div>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Stats</h4>
      <ul className="admin-list">
        {stats.map(stat => (
          <li key={stat.id} className="admin-list-item">
            <span>{stat.label}: {stat.value}</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(stat)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(stat.id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CurrentInfoEditor;
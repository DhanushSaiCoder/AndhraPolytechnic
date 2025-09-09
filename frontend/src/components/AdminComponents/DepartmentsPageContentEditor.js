import React, { useState, useEffect } from 'react';
import departmentService from '../../services/departmentService';

const DepartmentsPageContentEditor = () => {
  const [departments, setDepartments] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState({
    _id: '',
    name: '',
    shortName: '',
    description: '',
    image: '',
    vision: '',
    mission: '',
    achievements: '',
    activities: '',
    courses: '',
    faculty: '',
    labs: '',
    events: '',
    totalSeats: '',
    highestPackageInfo: { packageCTC: '', companyName: '' },
    averagePackage: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      alert('Failed to fetch departments.');
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDepartment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNestedChange = (e, parentField, subField) => {
    const { value } = e.target;
    setCurrentDepartment(prevState => ({
      ...prevState,
      [parentField]: {
        ...prevState[parentField],
        [subField]: value
      }
    }));
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setCurrentDepartment(prevState => ({
      ...prevState,
      [field]: value.split(',').map(item => item.trim())
    }));
  };

  const handleAddDepartment = async () => {
    if (currentDepartment.name.trim() === '' || currentDepartment.shortName.trim() === '') return;
    try {
      const departmentData = {
        ...currentDepartment,
        achievements: currentDepartment.achievements.split(',').map(item => item.trim()),
        activities: currentDepartment.activities.split(',').map(item => item.trim()),
        courses: currentDepartment.courses.split(';').map(course => {
          const [code, title] = course.split(':').map(s => s.trim());
          return { code, title };
        }),
        faculty: currentDepartment.faculty.split(';').map(f => {
          const [name, designation, specialization, imageUrl, socialsStr] = f.split('|').map(s => s.trim());
          const socials = socialsStr ? socialsStr.split(',').map(s => {
            const [type, url] = s.split('^').map(x => x.trim());
            return { type, url };
          }) : [];
          return { name, designation, specialization, imageUrl, socials };
        }),
        labs: currentDepartment.labs.split(';').map(l => {
          const [name, description, imageUrl] = l.split('|').map(s => s.trim());
          return { name, description, imageUrl };
        }),
        events: currentDepartment.events.split(';').map(e => {
          const [title, date, location, description] = e.split('|').map(s => s.trim());
          return { title, date: new Date(date), location, description };
        }),
        totalSeats: Number(currentDepartment.totalSeats),
        averagePackage: currentDepartment.averagePackage,
      };

      if (editingId) {
        await departmentService.updateDepartment(editingId, departmentData);
        alert('Department updated successfully!');
      } else {
        await departmentService.createDepartment(departmentData);
        alert('Department added successfully!');
      }
      fetchDepartments(); // Re-fetch departments
      setCurrentDepartment({
        _id: '',
        name: '',
        shortName: '',
        description: '',
        image: '',
        vision: '',
        mission: '',
        achievements: '',
        activities: '',
        courses: '',
        faculty: '',
        labs: '',
        events: '',
        totalSeats: '',
        highestPackageInfo: { packageCTC: '', companyName: '' },
        averagePackage: '',
      });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving department:', error);
      alert('Failed to save department.');
    }
  };

  const handleEdit = (dept) => {
    setCurrentDepartment({
      ...dept,
      achievements: dept.achievements.join(', '),
      activities: dept.activities.join(', '),
      courses: dept.courses.map(c => `${c.code}: ${c.title}`).join('; '),
      faculty: dept.faculty.map(f => `${f.name}|${f.designation}|${f.specialization}|${f.imageUrl}|${f.socials.map(s => `${s.type}^${s.url}`).join(',')}`).join('; '),
      labs: dept.labs.map(l => `${l.name}|${l.description}|${l.imageUrl}`).join('; '),
      events: dept.events.map(e => `${e.title}|${new Date(e.date).toISOString().split('T')[0]}|${e.location}|${e.description}`).join('; '),
      totalSeats: String(dept.totalSeats),
      averagePackage: dept.averagePackage,
    });
    setEditingId(dept._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await departmentService.deleteDepartment(id);
        alert('Department deleted successfully!');
        fetchDepartments();
      } catch (error) {
        console.error('Error deleting department:', error);
        alert('Failed to delete department.');
      }
    }
  };

  return (
    <div className="departments-content-editor">
      <h2>Departments Content Management</h2>

      <section className="admin-section">
        <h3>Add/Edit Department</h3>
        <div className="form-group">
          <label htmlFor="name">Department Name</label>
          <input type="text" id="name" name="name" value={currentDepartment.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="shortName">Short Name (e.g., CSE, ECE)</label>
          <input type="text" id="shortName" name="shortName" value={currentDepartment.shortName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={currentDepartment.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input type="text" id="image" name="image" value={currentDepartment.image} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="vision">Vision</label>
          <textarea id="vision" name="vision" value={currentDepartment.vision} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="mission">Mission</label>
          <textarea id="mission" name="mission" value={currentDepartment.mission} onChange={handleChange}></textarea>
        </div>

        <h4>Achievements (comma-separated)</h4>
        <div className="form-group">
          <textarea id="achievements" name="achievements" value={currentDepartment.achievements} onChange={(e) => handleArrayChange(e, 'achievements')}></textarea>
        </div>

        <h4>Activities (comma-separated)</h4>
        <div className="form-group">
          <textarea id="activities" name="activities" value={currentDepartment.activities} onChange={(e) => handleArrayChange(e, 'activities')}></textarea>
        </div>

        <h4>Courses (semicolon-separated: code: title)</h4>
        <div className="form-group">
          <textarea id="courses" name="courses" value={currentDepartment.courses} onChange={(e) => handleArrayChange(e, 'courses')}></textarea>
        </div>

        <h4>Faculty (semicolon-separated: name|designation|specialization|imageUrl|socials(type^url,type^url))</h4>
        <div className="form-group">
          <textarea id="faculty" name="faculty" value={currentDepartment.faculty} onChange={(e) => handleArrayChange(e, 'faculty')}></textarea>
        </div>

        <h4>Labs (semicolon-separated: name|description|imageUrl)</h4>
        <div className="form-group">
          <textarea id="labs" name="labs" value={currentDepartment.labs} onChange={(e) => handleArrayChange(e, 'labs')}></textarea>
        </div>

        <h4>Events (semicolon-separated: title|date(YYYY-MM-DD)|location|description)</h4>
        <div className="form-group">
          <textarea id="events" name="events" value={currentDepartment.events} onChange={(e) => handleArrayChange(e, 'events')}></textarea>
        </div>

        <h4>Statistics</h4>
        <div className="form-group">
          <label htmlFor="totalSeats">Total Seats</label>
          <input type="number" id="totalSeats" name="totalSeats" value={currentDepartment.totalSeats} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="highestPackageCTC">Highest Package CTC</label>
          <input type="text" id="highestPackageCTC" name="packageCTC" value={currentDepartment.highestPackageInfo.packageCTC} onChange={(e) => handleNestedChange(e, 'highestPackageInfo', 'packageCTC')} />
        </div>
        <div className="form-group">
          <label htmlFor="highestPackageCompany">Highest Package Company</label>
          <input type="text" id="highestPackageCompany" name="companyName" value={currentDepartment.highestPackageInfo.companyName} onChange={(e) => handleNestedChange(e, 'highestPackageInfo', 'companyName')} />
        </div>
        <div className="form-group">
          <label htmlFor="averagePackage">Average Package</label>
          <input type="text" id="averagePackage" name="averagePackage" value={currentDepartment.averagePackage} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button onClick={handleAddDepartment} className="save-btn">{editingId ? 'Save Changes' : 'Add Department'}</button>
          {editingId && <button onClick={() => {setEditingId(null); setCurrentDepartment({ _id: '', name: '', shortName: '', description: '', image: '', vision: '', mission: '', achievements: '', activities: '', courses: '', faculty: '', labs: '', events: '', totalSeats: '', highestPackageInfo: { packageCTC: '', companyName: '' }, averagePackage: '', });}} className="cancel-btn">Cancel Edit</button>}
        </div>
      </section>

      <h4 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy-color)'}}>Current Departments</h4>
      <ul className="admin-list">
        {departments.map(dept => (
          <li key={dept._id} className="admin-list-item">
            <span>{dept.name} ({dept.shortName})</span>
            <div className="admin-list-actions">
              <button onClick={() => handleEdit(dept)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(dept._id)} className="action-btn delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentsPageContentEditor;
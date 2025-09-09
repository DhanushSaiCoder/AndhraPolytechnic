import React, { useState, useEffect } from 'react';
import departmentService from '../../services/departmentService';
// It's recommended to add styles for the new classes in a relevant CSS file like AdminContent.css
// .dynamic-list-item, .dynamic-object-item, .add-btn, .remove-btn { ... }

const initialDepartmentState = {
  _id: '',
  name: '',
  shortName: '',
  description: '',
  image: '',
  vision: '',
  mission: '',
  achievements: [],
  activities: [],
  courses: [],
  faculty: [],
  labs: [],
  events: [],
  totalSeats: '',
  highestPackageInfo: { packageCTC: '', companyName: '' },
  averagePackage: '',
};

const DepartmentsPageContentEditor = () => {
  const [departments, setDepartments] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState({ ...initialDepartmentState });
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

  const handleListChange = (field, index, value) => {
    const updatedList = [...currentDepartment[field]];
    updatedList[index] = value;
    setCurrentDepartment(prevState => ({ ...prevState, [field]: updatedList }));
  };

  const handleObjectListChange = (field, index, subField, value) => {
    const updatedList = [...currentDepartment[field]];
    updatedList[index] = { ...updatedList[index], [subField]: value };
    setCurrentDepartment(prevState => ({ ...prevState, [field]: updatedList }));
  };
  
  const handleSocialsChange = (facultyIndex, socialIndex, subField, value) => {
    const updatedFaculty = [...currentDepartment.faculty];
    const updatedSocials = [...updatedFaculty[facultyIndex].socials];
    updatedSocials[socialIndex] = { ...updatedSocials[socialIndex], [subField]: value };
    updatedFaculty[facultyIndex] = { ...updatedFaculty[facultyIndex], socials: updatedSocials };
    setCurrentDepartment(prevState => ({ ...prevState, faculty: updatedFaculty }));
  };

  const handleAddItem = (field) => {
    let newItem;
    switch (field) {
      case 'achievements':
      case 'activities':
        newItem = '';
        break;
      case 'courses':
        newItem = { code: '', title: '' };
        break;
      case 'faculty':
        newItem = { name: '', designation: '', specialization: '', imageUrl: '', socials: [] };
        break;
      case 'labs':
        newItem = { name: '', description: '', imageUrl: '' };
        break;
      case 'events':
        newItem = { title: '', date: '', location: '', description: '' };
        break;
      default:
        return;
    }
    setCurrentDepartment(prevState => ({ ...prevState, [field]: [...prevState[field], newItem] }));
  };

  const handleAddSocial = (facultyIndex) => {
    const updatedFaculty = [...currentDepartment.faculty];
    if (!updatedFaculty[facultyIndex].socials) {
        updatedFaculty[facultyIndex].socials = [];
    }
    updatedFaculty[facultyIndex].socials.push({ type: '', url: '' });
    setCurrentDepartment(prevState => ({ ...prevState, faculty: updatedFaculty }));
  };

  const handleRemoveItem = (field, index) => {
    const updatedList = currentDepartment[field].filter((_, i) => i !== index);
    setCurrentDepartment(prevState => ({ ...prevState, [field]: updatedList }));
  };

  const handleRemoveSocial = (facultyIndex, socialIndex) => {
    const updatedFaculty = [...currentDepartment.faculty];
    updatedFaculty[facultyIndex].socials = updatedFaculty[facultyIndex].socials.filter((_, i) => i !== socialIndex);
    setCurrentDepartment(prevState => ({ ...prevState, faculty: updatedFaculty }));
  };

  const handleSaveDepartment = async () => {
    if (currentDepartment.name.trim() === '' || currentDepartment.shortName.trim() === '') return;
    try {
      const departmentData = {
        ...currentDepartment,
        totalSeats: Number(currentDepartment.totalSeats),
        achievements: currentDepartment.achievements.filter(item => item.trim() !== ''),
        activities: currentDepartment.activities.filter(item => item.trim() !== ''),
      };

      if (editingId) {
        await departmentService.updateDepartment(editingId, departmentData);
        alert('Department updated successfully!');
      } else {
        await departmentService.createDepartment(departmentData);
        alert('Department added successfully!');
      }
      fetchDepartments();
      setCurrentDepartment({ ...initialDepartmentState });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving department:', error);
      alert('Failed to save department.');
    }
  };

  const handleEdit = (dept) => {
    const departmentToEdit = {
      ...initialDepartmentState,
      ...dept,
      events: dept.events ? dept.events.map(e => ({ ...e, date: e.date ? new Date(e.date).toISOString().split('T')[0] : '' })) : [],
      highestPackageInfo: dept.highestPackageInfo || { packageCTC: '', companyName: '' },
      achievements: dept.achievements || [],
      activities: dept.activities || [],
      courses: dept.courses || [],
      faculty: dept.faculty ? dept.faculty.map(f => ({ ...f, socials: f.socials || [] })) : [],
      labs: dept.labs || [],
    };
    setCurrentDepartment(departmentToEdit);
    setEditingId(dept._id);
    window.scrollTo(0, 0); // Scroll to top to see the form
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

  const renderListEditor = (field, placeholder) => (
    <div className="form-section">
      <h4>{field.charAt(0).toUpperCase() + field.slice(1)}</h4>
      {currentDepartment[field].map((item, index) => (
        <div key={index} className="dynamic-list-item">
          <input
            type="text"
            value={item}
            onChange={(e) => handleListChange(field, index, e.target.value)}
            placeholder={placeholder}
          />
          <button type="button" onClick={() => handleRemoveItem(field, index)} className="remove-btn">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddItem(field)} className="add-btn">Add {placeholder}</button>
    </div>
  );

  return (
    <div className="departments-content-editor">
      <h2>Departments Content Management</h2>

      <section className="admin-section">
        <h3>{editingId ? 'Edit Department' : 'Add Department'}</h3>
        <div className="form-group">
          <label>Department Name</label>
          <input type="text" name="name" value={currentDepartment.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Short Name (e.g., CSE, ECE)</label>
          <input type="text" name="shortName" value={currentDepartment.shortName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={currentDepartment.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="image" value={currentDepartment.image} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Vision</label>
          <textarea name="vision" value={currentDepartment.vision} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Mission</label>
          <textarea name="mission" value={currentDepartment.mission} onChange={handleChange}></textarea>
        </div>

        {renderListEditor('achievements', 'Achievement')}
        {renderListEditor('activities', 'Activity')}

        <div className="form-section">
          <h4>Courses</h4>
          {currentDepartment.courses.map((course, index) => (
            <div key={index} className="dynamic-object-item">
              <input type="text" value={course.code} onChange={(e) => handleObjectListChange('courses', index, 'code', e.target.value)} placeholder="Course Code" />
              <input type="text" value={course.title} onChange={(e) => handleObjectListChange('courses', index, 'title', e.target.value)} placeholder="Course Title" />
              <button type="button" onClick={() => handleRemoveItem('courses', index)} className="remove-btn">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('courses')} className="add-btn">Add Course</button>
        </div>

        <div className="form-section">
          <h4>Faculty</h4>
          {currentDepartment.faculty.map((member, index) => (
            <div key={index} className="dynamic-object-item bordered-section">
              <h5>Faculty Member #{index + 1}</h5>
              <input type="text" value={member.name} onChange={(e) => handleObjectListChange('faculty', index, 'name', e.target.value)} placeholder="Name" />
              <input type="text" value={member.designation} onChange={(e) => handleObjectListChange('faculty', index, 'designation', e.target.value)} placeholder="Designation" />
              <input type="text" value={member.specialization} onChange={(e) => handleObjectListChange('faculty', index, 'specialization', e.target.value)} placeholder="Specialization" />
              <input type="text" value={member.imageUrl} onChange={(e) => handleObjectListChange('faculty', index, 'imageUrl', e.target.value)} placeholder="Image URL" />
              
              <h6>Socials</h6>
              {member.socials && member.socials.map((social, socialIndex) => (
                <div key={socialIndex} className="dynamic-list-item">
                  <input type="text" value={social.type} onChange={(e) => handleSocialsChange(index, socialIndex, 'type', e.target.value)} placeholder="Type (e.g., LinkedIn)" />
                  <input type="text" value={social.url} onChange={(e) => handleSocialsChange(index, socialIndex, 'url', e.target.value)} placeholder="URL" />
                  <button type="button" onClick={() => handleRemoveSocial(index, socialIndex)} className="remove-btn">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddSocial(index)} className="add-btn">Add Social</button>
              
              <button type="button" onClick={() => handleRemoveItem('faculty', index)} className="remove-btn" style={{marginTop: '10px'}}>Remove Faculty Member</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('faculty')} className="add-btn">Add Faculty Member</button>
        </div>

        <div className="form-section">
          <h4>Labs</h4>
          {currentDepartment.labs.map((lab, index) => (
            <div key={index} className="dynamic-object-item">
              <input type="text" value={lab.name} onChange={(e) => handleObjectListChange('labs', index, 'name', e.target.value)} placeholder="Lab Name" />
              <textarea value={lab.description} onChange={(e) => handleObjectListChange('labs', index, 'description', e.target.value)} placeholder="Lab Description"></textarea>
              <input type="text" value={lab.imageUrl} onChange={(e) => handleObjectListChange('labs', index, 'imageUrl', e.target.value)} placeholder="Image URL" />
              <button type="button" onClick={() => handleRemoveItem('labs', index)} className="remove-btn">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('labs')} className="add-btn">Add Lab</button>
        </div>

        <div className="form-section">
          <h4>Events</h4>
          {currentDepartment.events.map((event, index) => (
            <div key={index} className="dynamic-object-item">
              <input type="text" value={event.title} onChange={(e) => handleObjectListChange('events', index, 'title', e.target.value)} placeholder="Event Title" />
              <input type="date" value={event.date} onChange={(e) => handleObjectListChange('events', index, 'date', e.target.value)} />
              <input type="text" value={event.location} onChange={(e) => handleObjectListChange('events', index, 'location', e.target.value)} placeholder="Location" />
              <textarea value={event.description} onChange={(e) => handleObjectListChange('events', index, 'description', e.target.value)} placeholder="Event Description"></textarea>
              <button type="button" onClick={() => handleRemoveItem('events', index)} className="remove-btn">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem('events')} className="add-btn">Add Event</button>
        </div>

        <h4>Statistics</h4>
        <div className="form-group">
          <label>Total Seats</label>
          <input type="number" name="totalSeats" value={currentDepartment.totalSeats} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Highest Package CTC</label>
          <input type="text" name="packageCTC" value={currentDepartment.highestPackageInfo.packageCTC} onChange={(e) => handleNestedChange(e, 'highestPackageInfo', 'packageCTC')} />
        </div>
        <div className="form-group">
          <label>Highest Package Company</label>
          <input type="text" name="companyName" value={currentDepartment.highestPackageInfo.companyName} onChange={(e) => handleNestedChange(e, 'highestPackageInfo', 'companyName')} />
        </div>
        <div className="form-group">
          <label>Average Package</label>
          <input type="text" name="averagePackage" value={currentDepartment.averagePackage} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button onClick={handleSaveDepartment} className="save-btn">{editingId ? 'Save Changes' : 'Add Department'}</button>
          {editingId && <button onClick={() => {setEditingId(null); setCurrentDepartment({ ...initialDepartmentState });}} className="cancel-btn">Cancel Edit</button>}
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

import React, { useState, useEffect } from 'react';
import '../EditorModal.css';

const DepartmentModal = ({ isOpen, onClose, onSave, department }) => {
  const [currentDepartment, setCurrentDepartment] = useState(department);

  useEffect(() => {
    setCurrentDepartment(department);
  }, [department]);

  if (!isOpen) return null;

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

  const handleSave = () => {
    if (currentDepartment.name.trim() === '' || currentDepartment.shortName.trim() === '') {
      alert('Department Name and Short Name are required!');
      return;
    }
    const departmentData = {
      ...currentDepartment,
      totalSeats: Number(currentDepartment.totalSeats),
      achievements: currentDepartment.achievements.filter(item => item.trim() !== ''),
      activities: currentDepartment.activities.filter(item => item.trim() !== ''),
    };
    onSave(departmentData);
    onClose();
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
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentDepartment._id ? 'Edit Department' : 'Add Department'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
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

          <div className="form-section">
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
          </div>
        </div>
        <div className="editor-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentModal;

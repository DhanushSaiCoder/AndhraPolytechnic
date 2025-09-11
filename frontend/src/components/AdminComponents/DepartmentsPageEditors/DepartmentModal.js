import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, UploadCloud, Plus, X } from 'lucide-react';
import '../EditorModal.css';
import { getOptimizedImageUrl, uploadImage } from '../../../utils/cloudinaryUtils';

const DepartmentModal = ({ isOpen, onClose, onSave, department }) => {
  const [currentDepartment, setCurrentDepartment] = useState(department);
  const [isLoadingImage, setIsLoadingImage] = useState({}); // Use object to track loading for multiple images
  const fileInputRefs = useRef({}); // Use object to store refs for multiple file inputs

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
  

  const handleImageUpload = async (event, fieldName, index = null) => {
    const file = event.target.files[0];
    if (!file) return;

    const loadingKey = fieldName + (index !== null ? index : '');
    setIsLoadingImage(prev => ({ ...prev, [loadingKey]: true }));

    try {
      const publicId = await uploadImage(file);
      if (index !== null) {
        const updatedList = [...currentDepartment[fieldName]];
        updatedList[index] = { ...updatedList[index], imageUrl: publicId };
        setCurrentDepartment(prevState => ({ ...prevState, [fieldName]: updatedList }));
      } else {
        setCurrentDepartment(prevState => ({ ...prevState, [fieldName]: publicId }));
      }
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Image upload failed: ' + error.message);
    } finally {
      setIsLoadingImage(prev => ({ ...prev, [loadingKey]: false }));
      event.target.value = '';
    }
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
            <div className="image-input-group">
              <input
                type="text"
                name="image"
                value={isLoadingImage.image ? 'Uploading...' : getOptimizedImageUrl(currentDepartment.image)}
                readOnly
                placeholder="Upload an image to see the URL"
              />
              <input
                type="file"
                ref={el => fileInputRefs.current.image = el}
                style={{ display: 'none' }}
                onChange={(e) => handleImageUpload(e, 'image')}
                accept="image/*"
              />
              <button
                type="button"
                className="btn-icon"
                title="Upload Image"
                onClick={() => fileInputRefs.current.image.click()}
                disabled={isLoadingImage.image}
              >
                <Upload size={20} />
              </button>
            </div>
            {currentDepartment.image && !isLoadingImage.image && (
              <div className="image-preview">
                <img src={getOptimizedImageUrl(currentDepartment.image, { w: 100 })} alt="Preview" />
              </div>
            )}
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
              <div key={index} className="faculty-card">
                <div className="card-header">
                  <img className="avatar" src={getOptimizedImageUrl(member.imageUrl, { w: 64, h: 64, c: 'fill', g: 'face' }) || '/placeholder.png'} alt={member.name} />
                  <div className="header-meta">
                    <div className="title">{member.name || `Faculty #${index + 1}`}</div>
                    <div className="subtitle">{member.designation || 'Designation'}</div>
                  </div>
                  <div className="header-actions">
                    <button title="Remove" onClick={() => handleRemoveItem('faculty', index)} className="icon-btn danger">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <div className="input-group">
                      <label htmlFor={`faculty-name-${index}`}>Name</label>
                      <input id={`faculty-name-${index}`} className="input" value={member.name} placeholder="Full Name" onChange={e => handleObjectListChange('faculty', index, 'name', e.target.value)} />
                  </div>
                  <div className="input-group">
                      <label htmlFor={`faculty-designation-${index}`}>Designation</label>
                      <input id={`faculty-designation-${index}`} className="input" value={member.designation} placeholder="e.g., Head of Department" onChange={e => handleObjectListChange('faculty', index, 'designation', e.target.value)} />
                  </div>
                  <div className="input-group">
                      <label htmlFor={`faculty-specialization-${index}`}>Specialization</label>
                      <input id={`faculty-specialization-${index}`} className="input" value={member.specialization} placeholder="e.g., Machine Learning" onChange={e => handleObjectListChange('faculty', index, 'specialization', e.target.value)} />
                  </div>

                  <div className="meta-row">
                    <label className="upload">
                      <input type="file" ref={el => fileInputRefs.current[`faculty${index}`] = el} onChange={(e) => handleImageUpload(e, 'faculty', index)} accept="image/*" />
                      <span className="upload-btn">
                        <UploadCloud size={16} />
                        <span>{isLoadingImage[`faculty${index}`] ? 'Uploading...' : 'Upload Photo'}</span>
                      </span>
                    </label>
                  </div>

                  <div className="socials-compact-section">
                      <h6>Social Links</h6>
                      {member.socials && member.socials.map((social, socialIndex) => (
                          <div key={socialIndex} className="social-compact-item">
                              <input type="text" value={social.type} onChange={(e) => handleSocialsChange(index, socialIndex, 'type', e.target.value)} placeholder="Type (e.g., LinkedIn)" className="input" />
                              <input type="text" value={social.url} onChange={(e) => handleSocialsChange(index, socialIndex, 'url', e.target.value)} placeholder="https://linkedin.com/in/..." className="input" />
                              <button type="button" onClick={() => handleRemoveSocial(index, socialIndex)} className="icon-btn danger"><X size={16} /></button>
                          </div>
                      ))}
                      <button type="button" onClick={() => handleAddSocial(index)} className="btn-small add-btn">
                          <Plus size={16} />
                          <span>Add Social</span>
                      </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="section-actions">
              <button className="btn btn-primary" onClick={() => handleAddItem('faculty')}>
                  <Plus size={16} />
                  <span>Add Faculty Member</span>
              </button>
            </div>
          </div>

          <div className="form-section">
            <h4>Labs</h4>
            {currentDepartment.labs.map((lab, index) => (
              <div key={index} className="faculty-card">
                <div className="card-header">
                  <img className="avatar" src={getOptimizedImageUrl(lab.imageUrl, { w: 64, h: 64, c: 'fill' }) || '/placeholder.png'} alt={lab.name} />
                  <div className="header-meta">
                    <div className="title">{lab.name || `Lab #${index + 1}`}</div>
                  </div>
                  <div className="header-actions">
                    <button title="Remove" onClick={() => handleRemoveItem('labs', index)} className="icon-btn danger">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="card-body is-single-column">
                  <div className="input-group">
                      <label htmlFor={`lab-name-${index}`}>Lab Name</label>
                      <input id={`lab-name-${index}`} className="input" value={lab.name} placeholder="e.g., Advanced Communication Lab" onChange={e => handleObjectListChange('labs', index, 'name', e.target.value)} />
                  </div>
                  <div className="input-group">
                      <label htmlFor={`lab-desc-${index}`}>Description</label>
                      <textarea id={`lab-desc-${index}`} className="input" value={lab.description} placeholder="A brief description of the lab..." onChange={e => handleObjectListChange('labs', index, 'description', e.target.value)} rows={4}></textarea>
                  </div>

                  <div className="meta-row">
                    <label className="upload">
                      <input type="file" ref={el => fileInputRefs.current[`labs${index}`] = el} onChange={(e) => handleImageUpload(e, 'labs', index)} accept="image/*" />
                      <span className="upload-btn">
                        <UploadCloud size={16} />
                        <span>{isLoadingImage[`labs${index}`] ? 'Uploading...' : 'Upload Photo'}</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))}

            <div className="section-actions">
              <button className="btn btn-primary" onClick={() => handleAddItem('labs')}>
                  <Plus size={16} />
                  <span>Add Lab</span>
              </button>
            </div>
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

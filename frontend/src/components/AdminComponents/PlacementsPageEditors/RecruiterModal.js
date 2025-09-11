import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import '../EditorModal.css';
import { getOptimizedImageUrl, uploadImage } from '../../../utils/cloudinaryUtils';

const RecruiterModal = ({ isOpen, onClose, onSave, recruiter }) => {
  const [currentRecruiter, setCurrentRecruiter] = useState(recruiter);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCurrentRecruiter(recruiter);
  }, [recruiter]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecruiter(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoadingImage(true);
    try {
      const publicId = await uploadImage(file);
      setCurrentRecruiter(prevState => ({ ...prevState, logo: publicId }));
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Image upload failed: ' + error.message);
    } finally {
      setIsLoadingImage(false);
      event.target.value = '';
    }
  };

  const handleSave = () => {
    if (currentRecruiter.name.trim() === '' || currentRecruiter.logo.trim() === '') {
      alert('Company Name and Logo are required!');
      return;
    }
    onSave(currentRecruiter);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentRecruiter._id ? 'Edit Recruiter' : 'Add Recruiter'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="name">Company Name</label>
            <input type="text" id="name" name="name" value={currentRecruiter.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="logo">Logo URL</label>
            <div className="image-input-group">
              <input
                type="text"
                id="logo"
                name="logo"
                value={isLoadingImage ? 'Uploading...' : getOptimizedImageUrl(currentRecruiter.logo)}
                readOnly
                placeholder="Upload an image to see the URL"
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                accept="image/*"
              />
              <button
                type="button"
                className="btn-icon"
                title="Upload Image"
                onClick={() => fileInputRef.current.click()}
                disabled={isLoadingImage}
              >
                <Upload size={20} />
              </button>
            </div>
            {currentRecruiter.logo && !isLoadingImage && (
              <div className="image-preview">
                <img src={getOptimizedImageUrl(currentRecruiter.logo, { w: 100 })} alt="Logo Preview" />
              </div>
            )}
          </div>
        </div>
        <div className="editor-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterModal;

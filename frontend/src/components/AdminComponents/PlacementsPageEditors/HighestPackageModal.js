import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import '../EditorModal.css';
import { getOptimizedImageUrl, uploadImage } from '../../../utils/cloudinaryUtils';

const HighestPackageModal = ({ isOpen, onClose, onSave, pkg }) => {
  const [currentPackage, setCurrentPackage] = useState(pkg);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCurrentPackage(pkg);
  }, [pkg]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPackage(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoadingImage(true);
    try {
      const publicId = await uploadImage(file);
      setCurrentPackage(prevState => ({ ...prevState, image: publicId }));
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Image upload failed: ' + error.message);
    } finally {
      setIsLoadingImage(false);
      event.target.value = '';
    }
  };

  const handleSave = () => {
    if (currentPackage.name.trim() === '' || currentPackage.package.trim() === '') {
      alert('Student Name and Package are required!');
      return;
    }
    onSave(currentPackage);
    onClose();
  };

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className="editor-modal-content" onClick={e => e.stopPropagation()}>
        <div className="editor-modal-header">
          <h3>{currentPackage._id ? 'Edit Highest Package' : 'Add Highest Package'}</h3>
          <button className="editor-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editor-modal-body">
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input type="text" id="name" name="name" value={currentPackage.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input type="text" id="department" name="department" value={currentPackage.department} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="package">Package (e.g., 12 LPA)</label>
            <input type="text" id="package" name="package" value={currentPackage.package} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" value={currentPackage.company} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input type="number" id="year" name="year" value={currentPackage.year} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <div className="image-input-group">
              <input
                type="text"
                id="image"
                name="image"
                value={isLoadingImage ? 'Uploading...' : getOptimizedImageUrl(currentPackage.image)}
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
            {currentPackage.image && !isLoadingImage && (
              <div className="image-preview">
                <img src={getOptimizedImageUrl(currentPackage.image, { w: 100 })} alt="Preview" />
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

export default HighestPackageModal;

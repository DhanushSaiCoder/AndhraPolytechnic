import React from 'react';
import '../../../styles/DepartmentsStyles/DepartmentDetail.css';

const DepartmentDetailSkeleton = () => {
  return (
    <div className="department-detail-container">
      <div className="department-detail-header">
        <div className="skeleton skeleton-header-image"></div>
        <div className="department-header-overlay"></div>
        <div className="department-header-content">
          <div className="department-header-text-wrapper">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-description"></div>
          </div>
        </div>
      </div>
      <div className="department-section">
        <div className="department-section-container">
          <div className="section-header">
            <div className="skeleton skeleton-section-title"></div>
            <div className="skeleton skeleton-section-subtitle"></div>
          </div>
          <div className="vision-mission-content">
            <div className="vm-item">
              <div className="skeleton skeleton-vm-title"></div>
              <div className="skeleton skeleton-vm-text"></div>
            </div>
            <div className="vm-item">
              <div className="skeleton skeleton-vm-title"></div>
              <div className="skeleton skeleton-vm-text"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="department-section faculty-section">
        <div className="department-section-container">
          <div className="section-header">
            <div className="skeleton skeleton-section-title"></div>
            <div className="skeleton skeleton-section-subtitle"></div>
          </div>
          <div className="skeleton skeleton-carousel"></div>
        </div>
      </div>
      <div className="department-section labs-section">
        <div className="department-section-container">
          <div className="section-header">
            <div className="skeleton skeleton-section-title"></div>
            <div className="skeleton skeleton-section-subtitle"></div>
          </div>
          <div className="skeleton skeleton-carousel"></div>
        </div>
      </div>
      <div className="department-section events-section">
        <div className="department-section-container">
          <div className="section-header">
            <div className="skeleton skeleton-section-title"></div>
            <div className="skeleton skeleton-section-subtitle"></div>
          </div>
          <div className="skeleton skeleton-events-grid"></div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailSkeleton;

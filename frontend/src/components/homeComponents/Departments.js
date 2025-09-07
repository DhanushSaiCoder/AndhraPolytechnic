import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import '../../styles/HomeStyles/Departments.css'; // Adjust the path as necessary
import departmentsData from '../../data/departmentsData.json';
import { departmentIcons, DefaultIcon } from '../../data/departmentIcons';

const Departments = () => {
  return (
    <section className="departmentsComponent-section">
      <div className="departments-container">
        {/* Header */}
        <div className="departments-header">
          <div className="departments-badge">
            <GraduationCap className="badge-icon" />
            <span className="badge-text">Academic Excellence</span>
          </div>
          <h2 className="departments-title">
            Our Departments
          </h2>
          <p className="departments-description">
            Discover our diverse academic departments, each designed to provide cutting-edge education 
            and prepare students for successful careers in their chosen fields.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="departments-grid">
          {departmentsData.map((dept, index) => {
            const IconComponent = departmentIcons[dept.id] || DefaultIcon; // Use iconMap with dept.id
            return (
              <div
                key={dept.id} // dept.id is now a string
                className="department-card"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Gradient Background */}
                <div className="card-gradient-bg"></div>
                
                {/* Icon */}
                <div className="department-icon">
                  {IconComponent && <IconComponent />} {/* Render IconComponent if it exists */}
                </div>

                {/* Department Code */}
                <div className="department-info">
                  <span className="department-code">
                    {dept.shortName} {/* Use shortName from imported data */}
                  </span>
                  {/* Removed established and students as they are not in the new data */}
                </div>

                {/* Title */}
                <h3 className="department-title">
                  {dept.name} {/* Use name from imported data */}
                </h3>

                {/* Description */}
                <p className="department-description">
                  {dept.description}
                </p>

                {/* Learn More Button */}
                <div className="department-stats"> {/* Re-using department-stats for layout */}
                  <Link to={`/departments/${dept.id}`} className="learn-more-btn">
                    Learn More →
                  </Link>
                </div>

                {/* Hover Accent Line */}
                <div className="accent-line"></div>
              </div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
};

export default Departments;
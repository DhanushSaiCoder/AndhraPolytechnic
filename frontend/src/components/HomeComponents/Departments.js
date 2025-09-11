import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import '../../styles/HomeStyles/Departments.css'; // Adjust the path as necessary
import { departmentIcons, DefaultIcon } from '../../data/departmentIcons';
import departmentService from '../../services/departmentService';
import DepartmentsSkeleton from './DepartmentsSkeleton';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentService.getDepartments();
        setDepartments(response.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to load departments.');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <DepartmentsSkeleton />;
  }

  if (error) {
    return <section className="departmentsComponent-section"><div className="departments-container" style={{ color: 'red' }}>{error}</div></section>;
  }

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
          {departments.map((dept, index) => {
            const IconComponent = departmentIcons[dept.shortName] || DefaultIcon; // Use iconMap with dept.shortName
            return (
              <div
                key={dept._id} // Use _id from database
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
                    {dept.shortName} 
                  </span>
                </div>

                {/* Title */}
                <h3 className="department-title">
                  {dept.name} 
                </h3>

                {/* Description */}
                <p className="department-description">
                  {dept.description}
                </p>

                {/* Learn More Button */}
                <div className="department-stats"> 
                  <Link to={`/departments/${dept._id}`} className="learn-more-btn">
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

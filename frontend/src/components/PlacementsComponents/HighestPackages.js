import React, { useState, useEffect } from 'react';
import '../../styles/PlacementsStyles/HighestPackages.css';
import highestPackageService from '../../services/highestPackageService'; // Import service
import { getOptimizedImageUrl } from '../../utils/cloudinaryUtils';
import HighestPackagesSkeleton from './HighestPackagesSkeleton';

const HighestPackages = () => {
  const [studentPackages, setStudentPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await highestPackageService.getHighestPackages();
        setStudentPackages(response.data);
      } catch (error) {
        console.error('Error fetching highest packages:', error);
        setStudentPackages([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <HighestPackagesSkeleton />;
  }

  return (
    <section className="highest-packages-section">
      <div className="highest-packages-container">
        <header className="highest-packages-header">
          <h2>Our Highest Packages</h2>
          <p>Celebrating the success of our top-achieving students</p>
        </header>

        <div className="package-cards-grid">
          {studentPackages.map((student) => (
            <div key={student._id} className="package-card"> {/* Use _id for key */}
              <img src={getOptimizedImageUrl(student.image, { w: 100, h: 100 })} alt={student.name} className="student-avatar" />
              <h3 className="student-name">{student.name}</h3>
              <p className="student-department">{student.department}</p>
              <div className="package-details">
                <span className="package-value">{student.package}</span>
                <span className="company-name">{student.company}</span>
              </div>
              <p className="package-year">Batch of {student.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighestPackages;

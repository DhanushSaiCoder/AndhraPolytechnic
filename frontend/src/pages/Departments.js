
import React from 'react';
import LabCarousel from '../components/departmentsComponents/LabCarousel';
import StatsBar from '../components/departmentsComponents/StatsBar';
import '../styles/DepartmentsStyles/Departments.css'; // Adjust the path as necessary

export const departmentsData = [
  {
    id: 1,
    departmentIcon: 'https://example.com/icons/computer-science.png',
    departmentName: 'Computer Science',
    description: 'Focuses on computer systems, software development, and programming.',
    headOfDepartment: 'Dr. John Doe',
    totalSeats: 60,
    viewFactulty: '/departments/computer-science',
    viewCurriculum: '/departments/computer-science/curriculum',
    labs: [
      {
        labName: 'Programming Lab',
        labImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
        labDescription: 'A lab for hands-on programming experience.',
        labResources: ['Computers', 'Software Development Tools']
      },
      {
        labName: 'Networking Lab',
        labImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
        labDescription: 'A lab for networking and communication technologies.',
        labResources: ['Networking Equipment', 'Simulation Software']
      }
    ],
    highestPackage: {
      packageCTC: '12 LPA',
      companyName: 'Tech Innovations Ltd.'
    },
    averagePackage: '4.6 LPA',
  },
  {
    id: 2,
    departmentIcon: 'https://example.com/icons/electronics.png',
    departmentName: 'Electronics and Communication',
    description: 'Covers electronics, communication systems, and signal processing.',
    headOfDepartment: 'Dr. Jane Smith',
    totalSeats: 50,
    viewFactulty: '/departments/electronics-communication',
    viewCurriculum: '/departments/electronics-communication/curriculum',
    labs: [
      {
        labName: 'Circuit Design Lab',
        labImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&h=400&fit=crop',
        labDescription: 'A lab for designing and testing electronic circuits.',
        labResources: ['Oscilloscopes', 'Multimeters']
      },
      {
        labName: 'Communication Systems Lab',
        labImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop',
        labDescription: 'A lab for studying communication technologies.',
        labResources: ['Signal Generators', 'Modulation Equipment']
      }
    ],
    highestPackage: {
      packageCTC: '10 LPA',
      companyName: 'ElectroTech Solutions'
    },
    averagePackage: '4.2 LPA',
  },
  {
    id: 3,
    departmentIcon: 'https://example.com/icons/mechanical.png',
    departmentName: 'Mechanical Engineering',
    description: 'Focuses on mechanical systems, design, and manufacturing.',
    headOfDepartment: 'Dr. Alice Johnson',
    totalSeats: 70,
    viewFactulty: '/departments/mechanical-engineering',
    viewCurriculum: '/departments/mechanical-engineering/curriculum',
    labs: [
      {
        labName: 'Thermodynamics Lab',
        labImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop',
        labDescription: 'A lab for studying thermodynamic principles.',
        labResources: ['Heat Exchangers', 'Thermometers']
      },
      {
        labName: 'Fluid Mechanics Lab',
        labImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
        labDescription: 'A lab for fluid dynamics experiments.',
        labResources: ['Flow Meters', 'Pumps']
      }
    ],
    highestPackage: {
      packageCTC: '9 LPA',
      companyName: 'MechTech Industries'
    },
    averagePackage: '4.0 LPA',
  },
  {
    id: 4,
    departmentIcon: 'https://example.com/icons/civil.png',
    departmentName: 'Civil Engineering',
    description: 'Covers construction, infrastructure, and environmental engineering.',
    headOfDepartment: 'Dr. Robert Brown',
    totalSeats: 80,
    viewFactulty: '/departments/civil-engineering',
    viewCurriculum: '/departments/civil-engineering/curriculum',
    labs: [
      {
        labName: 'Structural Analysis Lab',
        labImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
        labDescription: 'A lab for analyzing structural components.',
        labResources: ['Load Testing Equipment', 'Structural Models']
      },
      {
        labName: 'Geotechnical Engineering Lab',
        labImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&h=400&fit=crop',
        labDescription: 'A lab for soil and foundation studies.',
        labResources: ['Soil Testing Kits', 'Compaction Equipment']
      }
    ],
    highestPackage: {
      packageCTC: '8 LPA',
      companyName: 'BuildRight Constructions'
    },
    averagePackage: '3.8 LPA',
  }
];

const getIconEmoji = (departmentName) => {
  switch (departmentName.toLowerCase()) {
    case 'computer science':
      return '💻';
    case 'electronics and communication':
      return '⚡';
    case 'mechanical engineering':
      return '⚙️';
    case 'civil engineering':
      return '🏗️';
    default:
      return '🎓';
  }
};

const Departments = () => {
  return (
    <section className="departments-section">
      <div className="departments-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Academic Departments</h2>
          <p className="section-description">
            Explore our diverse academic departments, each dedicated to providing quality education and research opportunities. 
            
          </p>
          {/* <div className="section-divider"></div> */}
        </div>

        {/* Departments Grid */}
        <div className="departments-grid">
          {departmentsData.map((department) => (
            <div key={department.id} className="departmentPage-department-card">
              <div className="card-header">
                <div className="header-content">
                  <span className="department-emoji">{getIconEmoji(department.departmentName)}</span>
                  <div className="header-text">
                    <h3 className="department-name">{department.departmentName}</h3>
                    <p className="department-head">Head of Department: {department.headOfDepartment}</p>
                  </div>
                </div>
              </div>

              <div className="card-content">
                <p className="department-description">{department.description}</p>

                {/* Stats Bar */}
                <StatsBar 
                  totalSeats={department.totalSeats}
                  highestPackage={`${department.highestPackage.packageCTC} (${department.highestPackage.companyName})`}
                  averagePackage={department.averagePackage}
                />

                {/* Lab Images Section */}
                <div className="labs-section">
                  <h4 className="labs-title">
                    <span className="title-dot"></span>
                    Laboratory Facilities
                  </h4>
                  <LabCarousel 
                    images={department.labs.map(lab => ({
                      src: lab.labImage,
                      alt: lab.labName,
                      caption: lab.labDescription
                    }))}
                  />
                </div>
              </div>

              <div className="card-footer">
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.href = department.viewFactulty}
                >
                  View Faculty
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => window.location.href = department.viewCurriculum}
                >
                  View Curriculum
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action
        <div className="cta-section">
          <div className="cta-card">
            <h3 className="cta-title">Ready to Start Your Journey?</h3>
            <p className="cta-description">
              Discover which department aligns with your career goals and interests.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Apply Now</button>
              <button className="btn btn-secondary">Schedule Campus Visit</button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Departments;


import React from 'react';
import { GraduationCap, Cpu, Building, Users, Globe, BookOpen } from 'lucide-react';
import '../../styles/HomeStyles/Departments.css'; // Adjust the path as necessary
const departmentsData = [
  {
    id: 1,
    title: "Computer Engineering",
    code: "CE",
    description: "Focuses on computer systems, software development, and programming, preparing students for leadership roles in the tech industry.",
    icon: Cpu,
    established: "1985",
    students: "850+"
  },
  {
    id: 2,
    title: "Electronics and Communication Engineering",
    code: "ECE", 
    description: "Advanced training in electronic devices, circuits, and communication systems, building expertise for careers in electronics and telecommunications.",
    icon: Globe,
    established: "1978",
    students: "720+"
  },
  {
    id: 3,
    title: "Electrical Engineering",
    code: "EE",
    description: "Deals with the study and application of electricity, electronics, and electromagnetism, preparing students for careers in power, control, and electronics.",
    icon: BookOpen, // Using BookOpen as a placeholder, consider adding a specific electrical icon if available
    established: "1975",
    students: "650+"
  },
  {
    id: 4,
    title: "Civil Engineering",
    code: "CE",
    description: "Focus on infrastructure development, sustainable construction, and urban planning with hands-on project experience.",
    icon: Building,
    established: "1965",
    students: "680+"
  },
  {
    id: 5,
    title: "Mechanical Engineering",
    code: "ME",
    description: "Comprehensive program covering design, manufacturing, and thermal systems, with state-of-the-art labs and industry partnerships.",
    icon: Building, // Using Building as a placeholder, consider adding a specific mechanical icon if available
    established: "1970",
    students: "950+"
  },
  {
    id: 6,
    title: "Architecture Engineering",
    code: "AE",
    description: "Combines architectural design with engineering principles, focusing on the structural and environmental aspects of buildings.",
    icon: Building, // Using Building as a placeholder, consider adding a specific architecture icon if available
    established: "1998",
    students: "350+"
  },
  {
    id: 7,
    title: "Automobile Engineering",
    code: "AUTO",
    description: "Focuses on the design, manufacturing, and operation of automobiles, including vehicle dynamics, engines, and automotive electronics.",
    icon: Globe, // Using Globe as a placeholder, consider adding a specific automobile icon if available
    established: "2005",
    students: "400+"
  }
];

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
            const IconComponent = dept.icon;
            return (
              <div
                key={dept.id}
                className="department-card"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Gradient Background */}
                <div className="card-gradient-bg"></div>
                
                {/* Icon */}
                <div className="department-icon">
                  <IconComponent className="departmentIcon" />
                </div>

                {/* Department Code */}
                <div className="department-info">
                  <span className="department-code">
                    {dept.code}
                  </span>
                  <span className="department-established">Est. {dept.established}</span>
                </div>

                {/* Title */}
                <h3 className="department-title">
                  {dept.title}
                </h3>

                {/* Description */}
                <p className="department-description">
                  {dept.description}
                </p>

                {/* Stats */}
                <div className="department-stats">
                  <div className="stats-info">
                    <Users className="stats-icon" />
                    <span className="stats-text">{dept.students} Students</span>
                  </div>
                  <button className="learn-more-btn">
                    Learn More →
                  </button>
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


import React from 'react';
import { GraduationCap, Cpu, Building, Users, Globe, BookOpen } from 'lucide-react';
import '../../styles/HomeStyles/Departments.css'; // Adjust the path as necessary
const departmentsData = [
  {
    id: 1,
    title: "Computer Science & Engineering",
    code: "CSE",
    description: "Cutting-edge curriculum in software development, artificial intelligence, and computer systems, preparing students for leadership roles in the tech industry.",
    icon: Cpu,
    established: "1985",
    students: "850+"
  },
  {
    id: 2,
    title: "Electronics & Communication",
    code: "ECE", 
    description: "Advanced training in electronic devices, circuits, and communication systems, building expertise for careers in electronics and telecommunications.",
    icon: Globe,
    established: "1978",
    students: "720+"
  },
  {
    id: 3,
    title: "Mechanical Engineering",
    code: "ME",
    description: "Comprehensive program covering design, manufacturing, and thermal systems, with state-of-the-art labs and industry partnerships.",
    icon: Building,
    established: "1970",
    students: "950+"
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
    title: "Business Administration",
    code: "MBA",
    description: "Strategic management education with emphasis on leadership, entrepreneurship, and global business perspectives.",
    icon: Users,
    established: "1990",
    students: "420+"
  },
  {
    id: 6,
    title: "Liberal Arts & Sciences",
    code: "LAS",
    description: "Interdisciplinary approach to humanities, social sciences, and natural sciences, fostering critical thinking and creativity.",
    icon: BookOpen,
    established: "1995",
    students: "380+"
  }
];

const Departments = () => {
  return (
    <section className="departments-section">
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

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-card">
            <h3 className="cta-title">
              Ready to Start Your Journey?
            </h3>
            <p className="cta-description">
              Explore our programs and find the perfect fit for your academic and career goals.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">
                Apply Now
              </button>
              <button className="btn-secondary">
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Departments;

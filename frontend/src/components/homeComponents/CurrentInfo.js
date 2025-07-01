

import React from 'react';
import { Users, GraduationCap, TrendingUp } from 'lucide-react';
import '../../styles/HomeStyles/CurrentInfo.css';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '1200',
      label: 'Total Students',
      description: 'Active learners pursuing technical education'
    },
    {
      icon: GraduationCap,
      value: '50',
      label: 'Total Faculty',
      description: 'Experienced educators and industry experts'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Placement Rate',
      description: 'Successful career placement for graduates'
    }
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        <header className="stats-header">
          <h2>Our Achievements</h2>
          <p>Numbers that reflect our commitment to excellence in technical education</p>
        </header>

        <div className="stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="stat-card">
                <div className="stat-icon">
                  <Icon size={32} />
                </div>

                <div className="stat-value">{stat.value}</div>
                <h3 className="stat-label">{stat.label}</h3>
                <p className="stat-desc">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

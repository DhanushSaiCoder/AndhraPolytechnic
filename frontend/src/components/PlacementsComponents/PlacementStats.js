import React from 'react';
import { Users, Briefcase, DollarSign } from 'lucide-react';
import '../../styles/PlacementsStyles/PlacementStats.css';

const PlacementStats = () => {
  const stats = [
    {
      icon: Users,
      value: '1000+',
      label: 'Students Placed',
      description: 'Successfully placed in top companies annually'
    },
    {
      icon: Briefcase,
      value: '200+',
      label: 'Recruiting Companies',
      description: 'Diverse range of industries and sectors'
    },
    {
      icon: DollarSign,
      value: '12 LPA',
      label: 'Highest Package',
      description: 'Achieved by our talented graduates'
    }
  ];

  return (
    <section className="placement-stats-section">
      <div className="placement-stats-container">
        <header className="placement-stats-header">
          <h2>Our Placement Success</h2>
          <p>Key figures highlighting our commitment to student career growth</p>
        </header>

        <div className="placement-stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="placement-stat-card">
                <div className="placement-stat-icon">
                  <Icon size={32} />
                </div>

                <div className="placement-stat-value">{stat.value}</div>
                <h3 className="placement-stat-label">{stat.label}</h3>
                <p className="placement-stat-desc">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlacementStats;



import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, TrendingUp } from 'lucide-react';
import '../../styles/HomeStyles/CurrentInfo.css';
import statService from '../../services/statService'; // Import statService

const iconMap = {
  Users: Users,
  GraduationCap: GraduationCap,
  TrendingUp: TrendingUp,
  // Add other icons as needed
};

const StatsSection = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statService.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats([]); // Set empty array on error
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-container">
        <header className="stats-header">
          <h2>Our Achievements</h2>
          <p>Numbers that reflect our commitment to excellence in technical education</p>
        </header>

        <div className="stats-grid">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon]; // Use iconMap to get the component
            return (
              <div key={stat._id} className="stat-card"> {/* Use stat._id for key */}
                <div className="stat-icon">
                  {Icon && <Icon size={32} />} {/* Render Icon if it exists */}
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

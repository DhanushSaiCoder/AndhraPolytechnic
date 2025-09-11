import React, { useState, useEffect } from 'react';
import { Users, Briefcase, DollarSign } from 'lucide-react';
import '../../styles/PlacementsStyles/PlacementStats.css';
import placementStatService from '../../services/placementStatService'; // Import service
import PlacementStatsSkeleton from './PlacementStatsSkeleton';

const iconMap = {
  Users: Users,
  Briefcase: Briefcase,
  DollarSign: DollarSign,
  // Add other icons as needed
};

const PlacementStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await placementStatService.getPlacementStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching placement stats:', error);
        setStats([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <PlacementStatsSkeleton />;
  }

  return (
    <section className="placement-stats-section">
      <div className="placement-stats-container">
        <header className="placement-stats-header">
          <h2>Our Placement Success</h2>
          <p>Key figures highlighting our commitment to student career growth</p>
        </header>

        <div className="placement-stats-grid">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon]; // Use iconMap to get the component
            return (
              <div key={stat._id} className="placement-stat-card"> {/* Use stat._id for key */}
                <div className="placement-stat-icon">
                  {Icon && <Icon size={32} />} {/* Render Icon if it exists */}
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

import React from 'react';
import { Users, Award, TrendingUp } from 'lucide-react';
import '../../styles/DepartmentsStyles/StatsBar.css'; // Adjust the path as necessary

const StatsBar = ({ totalSeats, highestPackageInfo, averagePackage }) => {
    return (
        <div className="stats-bar">
            <div className="stats-grid">
                {/* Total Seats */}
                <div className="stat-item">
                    <div className="stat-icon users-icon">
                        <Users className='stat-icon-svg' />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Seats</p>
                        <p className="stat-value">{totalSeats}</p>
                    </div>
                </div>

                {/* Highest Package */}
                <div className="stat-item">
                    <div className="stat-icon award-icon">
                        <Award className='stat-icon-svg' />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Highest Package</p>
                        <p className="stat-value-small">{highestPackageInfo.packageCTC}</p>
                        <p className="company-name">by {highestPackageInfo.companyName}</p>
                    </div>
                </div>

                {/* Average Package */}
                <div className="stat-item">
                    <div className="stat-icon trending-icon">
                        <TrendingUp className='stat-icon-svg' />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Average Package</p>
                        <p className="stat-value">{averagePackage}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsBar;
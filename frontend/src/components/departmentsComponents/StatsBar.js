
import React from 'react';
import '../../styles/DepartmentsStyles/StatsBar.css'; // Adjust the path as necessary

const StatsBar = ({ totalSeats, highestPackage, averagePackage }) => {
    return (
        <div className="stats-bar">
            <div className="stats-grid">
                {/* Total Seats */}
                <div className="stat-item">
                    <div className="stat-icon users-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="m22 21-3-3m0 0a5 5 0 1 0-7-7 5 5 0 0 0 7 7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Seats</p>
                        <p className="stat-value">{totalSeats}</p>
                    </div>
                </div>

                {/* Highest Package */}
                <div className="stat-item">
                    <div className="stat-icon award-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="8" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="m8.21 13.89 4-4 4 4-4 4-4-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 2v6l3 1-3 1v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Highest Package</p>
                        <p className="stat-value-small">{highestPackage}</p>
                    </div>
                </div>

                {/* Average Package */}
                <div className="stat-item">
                    <div className="stat-icon trending-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="16,7 22,7 22,13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
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

import React from 'react';
import '../../styles/PlacementsStyles/PlacementsHeroSection.css';
import { Briefcase } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const studentsData = [
  { year: '2020', students: 800 },
  { year: '2021', students: 950 },
  { year: '2022', students: 1100 },
  { year: '2023', students: 1250 },
  { year: '2024', students: 1400 },
];

const packageData = [
  { year: '2020', avgPackage: 4.5 },
  { year: '2021', avgPackage: 5.2 },
  { year: '2022', avgPackage: 6.0 },
  { year: '2023', avgPackage: 6.8 },
  { year: '2024', avgPackage: 7.5 },
];

const PlacementsHeroSection = () => {
    return (
        <header className="placements-hero-section">
            <div className="placements-badge">
                <Briefcase className="badge-icon" />
                <span className="badge-text">Career Opportunities</span>
            </div>
            <h1 className="placements-title-main">
                Empowering Futures Through <br /> <span className="title-highlight">Placements</span>
            </h1>
            <p className="placements-description-main">
                Connecting talent with industry leaders for a successful career journey.
            </p>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Students Placed Over Years</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={studentsData} margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="students" stroke="#3F72AF" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Average Package Over Years</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={packageData} margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="avgPackage" fill="#112D4E" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </header>
    );
}

export default PlacementsHeroSection;

import React from 'react';
import '../../styles/PlacementsStyles/PlacementsHeroSection.css';
import { Briefcase } from 'lucide-react';
import { LineChart, BarChart } from '@mui/x-charts';

const studentsData = {
    years: ['2020', '2021', '2022', '2023', '2024'],
    students: [800, 950, 1100, 1250, 1400],
};

const packageData = {
    years: ['2020', '2021', '2022', '2023', '2024'],
    avgPackage: [4.5, 5.2, 6.0, 6.8, 7.5],
};

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

            <div className="charts-container">
                <div className="chart-wrapper">
                    <LineChart
                        xAxis={[{ scaleType: 'band', data: studentsData.years, tickLabelStyle: { fill: '#4b5563', fontSize: '0.8rem' } }]}
                        yAxis={[{ tickLabelStyle: { fill: '#4b5563', fontSize: '0.8rem' } }]}
                        series={[
                            {
                                data: studentsData.students,
                                label: 'Students Placed',
                                area: true,
                                color: '#3F72AF',
                            },
                        ]}
                        height={300}
                        margin={{ top: 70, bottom: 30, left: 40, right: 20 }}
                        grid={{ horizontal: true }}
                        slotProps={{
                            legend: { hidden: true },
                        }}
                    >
                        <defs>
                            <linearGradient id="students-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3F72AF" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#3F72AF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <g>
                            <text x="50%" y="40" textAnchor="middle" dominantBaseline="middle" className="chart-title">
                                Students Placed Over Years
                            </text>
                        </g>
                    </LineChart>
                </div>

                <div className="chart-wrapper">
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: packageData.years, tickLabelStyle: { fill: '#4b5563', fontSize: '0.8rem' } }]}
                        yAxis={[{ tickLabelStyle: { fill: '#4b5563', fontSize: '0.8rem' } }]}
                        series={[
                            {
                                data: packageData.avgPackage,
                                label: 'Average Package (LPA)',
                                color: '#112D4E',
                            },
                        ]}
                        height={300}
                        margin={{ top: 70, bottom: 30, left: 40, right: 20 }}
                        grid={{ horizontal: true }}
                        slotProps={{
                            legend: { hidden: true },
                            bar: {
                                rx: 4, // Border radius for bars
                            },
                        }}
                    >
                        <g>
                            <text x="50%" y="40" textAnchor="middle" dominantBaseline="middle" className="chart-title">
                                Average Package Over Years
                            </text>
                        </g>
                    </BarChart>
                </div>
            </div>
        </header>
    );
}

export default PlacementsHeroSection;

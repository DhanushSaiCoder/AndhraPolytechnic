import React, { useState, useEffect } from 'react';
import '../../styles/PlacementsStyles/PlacementsHeroSection.css';
import { Briefcase } from 'lucide-react';
import { LineChart, BarChart } from '@mui/x-charts';
import placementHeroService from '../../services/placementHeroService';
import PlacementsHeroSkeleton from './PlacementsHeroSkeleton';

const PlacementsHeroSection = () => {
    const [chartData, setChartData] = useState({
        years: [],
        students: [],
        avgPackage: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                setLoading(true);
                const response = await placementHeroService.getPlacementHeroData();
                if (response.data && response.data.years) {
                    setChartData(response.data);
                }
            } catch (error) {
                console.error('Error fetching placement hero data:', error);
                // You could set an error state here to display a message in the UI
            } finally {
                setLoading(false);
            }
        };
        fetchHeroData();
    }, []);

    if (loading) {
        return <PlacementsHeroSkeleton />;
    }

    return (
        <header className="placements-hero-section">
            <div className="placements-badge">
                <Briefcase className="badge-icon" />
                <span className="badge-text">Career Opportunities</span>
            </div>
            <h1 className="placements-title-main">
                Your Gateway to a Great Career <br /> <span className="title-highlight">Placements</span>
            </h1>
            <p className="placements-description-main">
                Connecting talent with industry leaders for a successful career journey.
            </p>

            <div className="charts-container">
                <div className="chart-wrapper">
                    <LineChart
                        xAxis={[{ scaleType: 'band', data: chartData.years, tickLabelStyle: { fill: '#4b5563', fontSize: '0.8rem' } }]}
                        yAxis={[{ tickLabelStyle: { fill: '#4b5563', fontSize: '0.8rem' } }]}
                        series={[
                            {
                                data: chartData.students,
                                label: 'Students Placed',
                                area: true,
                                color: '#3F72AF',
                            },
                        ]}
                        height={300}
                        margin={{ top: 70, bottom: 30, left: 40, right: 20 }}
                        grid={{ horizontal: true }}
                        loading={loading}
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
                        xAxis={[{ scaleType: 'band', data: chartData.years, tickLabelStyle: { fill: '#4b5563', fontSize: '0.8rem' } }]}
                        yAxis={[{ tickLabelStyle: { fill: '#4b5563', fontSize: '0.8rem' } }]}
                        series={[
                            {
                                data: chartData.avgPackage,
                                label: 'Average Package (LPA)',
                                color: '#3F72AF',
                            },
                        ]}
                        height={300}
                        margin={{ top: 70, bottom: 30, left: 40, right: 20 }}
                        grid={{ horizontal: true }}
                        loading={loading}
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

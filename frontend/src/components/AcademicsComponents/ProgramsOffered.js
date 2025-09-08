import React from 'react';
import '../../styles/AcademicsStyles/Programs.css'; // Assuming this CSS file will be used
import { Laptop, Wrench, FlaskConical, Building, Lightbulb, Code } from 'lucide-react';

const programsData = [
    {
        id: 1,
        icon: Laptop,
        title: "Computer Engineering",
        description: "Focuses on hardware, software, and networking, preparing students for the digital age."
    },
    {
        id: 2,
        icon: Wrench,
        title: "Mechanical Engineering",
        description: "Covers design, analysis, manufacturing, and maintenance of mechanical systems."
    },
    {
        id: 3,
        icon: FlaskConical,
        title: "Chemical Engineering",
        description: "Deals with the design and operation of industrial chemical processes."
    },
    {
        id: 4,
        icon: Building,
        title: "Civil Engineering",
        description: "Involves the design, construction, and maintenance of the physical and naturally built environment."
    },
    {
        id: 5,
        icon: Lightbulb,
        title: "Electrical Engineering",
        description: "Studies electricity, electronics, and electromagnetism, and their applications."
    },
    {
        id: 6,
        icon: Code,
        title: "Electronics & Communication Engineering",
        description: "Focuses on electronic devices, circuits, and communication systems."
    }
];

const ProgramsOffered = () => {
    return (
        <section className="programs-offered-section">
            <div className="programs-offered-container">
                <header className="programs-offered-header">
                    <div className="programs-badge">
                        <Laptop className="badge-icon" />
                        <span className="badge-text">Our Programs</span>
                    </div>
                    <h2 className="programs-title">
                        Diploma Programs Offered
                    </h2>
                    <p className="programs-description">
                        Discover our diverse range of diploma programs designed to equip you with practical skills and industry knowledge.
                    </p>
                </header>

                <div className="programs-grid">
                    {programsData.map(program => {
                        const Icon = program.icon;
                        return (
                            <div key={program.id} className="program-card">
                                <div className="program-icon-wrapper">
                                    <Icon className="program-icon" />
                                </div>
                                <h3 className="program-card-title">{program.title}</h3>
                                <p className="program-card-description">{program.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProgramsOffered;
export const departmentsData = [
    {
        id: 1,
        departmentIcon: 'https://example.com/icons/computer-science.png',
        departmentName: 'Computer Science',
        description: 'Focuses on computer systems, software development, and programming.',
        headOfDepartment: 'Dr. John Doe',
        totalSeats: 60,
        viewFactulty: '/departments/computer-science',
        viewCurriculum: '/departments/computer-science/curriculum',
        labs: [
            {
                labName: 'Programming Lab',
                labImage: 'https://example.com/icons/programming-lab.png',
                labDescription: 'A lab for hands-on programming experience.',
                labResources: ['Computers', 'Software Development Tools']
            },
            {
                labName: 'Networking Lab',
                labImage: 'https://example.com/icons/networking-lab.png',
                labDescription: 'A lab for networking and communication technologies.',
                labResources: ['Networking Equipment', 'Simulation Software']
            }
        ],
        highestPackage: {
            packageCTC: '12 LPA',
            companyName: 'Tech Innovations Ltd.'
        },
        averagePackage: '4.6 LPA',

    },
    {
        id: 2,
        departmentIcon: 'https://example.com/icons/electronics.png',
        departmentName: 'Electronics and Communication',
        description: 'Covers electronics, communication systems, and signal processing.',
        headOfDepartment: 'Dr. Jane Smith',
        totalSeats: 50,
        viewFactulty: '/departments/electronics-communication',
        viewCurriculum: '/departments/electronics-communication/curriculum',
        labs: [
            {
                labName: 'Circuit Design Lab',
                labImage: 'https://example.com/icons/circuit-design-lab.png',
                labDescription: 'A lab for designing and testing electronic circuits.',
                labResources: ['Oscilloscopes', 'Multimeters']
            },
            {
                labName: 'Communication Systems Lab',
                labImage: 'https://example.com/icons/communication-systems-lab.png',
                labDescription: 'A lab for studying communication technologies.',
                labResources: ['Signal Generators', 'Modulation Equipment']
            }
        ],
        highestPackage: {
            packageCTC: '10 LPA',
            companyName: 'ElectroTech Solutions'
        },
        averagePackage: '4.2 LPA',
    },
    {
        id: 3,
        departmentIcon: 'https://example.com/icons/mechanical.png',
        departmentName: 'Mechanical Engineering',
        description: 'Focuses on mechanical systems, design, and manufacturing.',
        headOfDepartment: 'Dr. Alice Johnson',
        totalSeats: 70,
        viewFactulty: '/departments/mechanical-engineering',
        viewCurriculum: '/departments/mechanical-engineering/curriculum',
        labs: [
            {
                labName: 'Thermodynamics Lab',
                labImage: 'https://example.com/icons/thermodynamics-lab.png',
                labDescription: 'A lab for studying thermodynamic principles.',
                labResources: ['Heat Exchangers', 'Thermometers']
            },
            {
                labName: 'Fluid Mechanics Lab',
                labImage: 'https://example.com/icons/fluid-mechanics-lab.png',
                labDescription: 'A lab for fluid dynamics experiments.',
                labResources: ['Flow Meters', 'Pumps']
            }
        ],
        highestPackage: {
            packageCTC: '9 LPA',
            companyName: 'MechTech Industries'
        },
        averagePackage: '4.0 LPA',
    },
    {
        id: 4,
        departmentIcon: 'https://example.com/icons/civil.png',
        departmentName: 'Civil Engineering',
        description: 'Covers construction, infrastructure, and environmental engineering.',
        headOfDepartment: 'Dr. Robert Brown',
        totalSeats: 80,
        viewFactulty: '/departments/civil-engineering',
        viewCurriculum: '/departments/civil-engineering/curriculum',
        labs: [
            {
                labName: 'Structural Analysis Lab',
                labImage: 'https://example.com/icons/structural-analysis-lab.png',
                labDescription: 'A lab for analyzing structural components.',
                labResources: ['Load Testing Equipment', 'Structural Models']
            },
            {
                labName: 'Geotechnical Engineering Lab',
                labImage: 'https://example.com/icons/geotechnical-engineering-lab.png',
                labDescription: 'A lab for soil and foundation studies.',
                labResources: ['Soil Testing Kits', 'Compaction Equipment']
            }
        ],
        highestPackage: {
            packageCTC: '8 LPA',
            companyName: 'BuildRight Constructions'
        },
        averagePackage: '3.8 LPA',
    }
]
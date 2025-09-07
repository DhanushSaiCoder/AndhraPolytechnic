export const departmentsData = [
    {
        id: 'computer-engineering',
        name: 'Computer Engineering',
        shortName: 'CSE',
        vision: 'To be a center of excellence in Computer Engineering education, fostering innovation and research for societal development.',
        mission: 'To provide quality education in Computer Engineering, equip students with problem-solving skills, and promote ethical values for professional success.',
        description: 'The Department of Computer Engineering offers a comprehensive curriculum covering various aspects of computer science and engineering. Students gain expertise in programming, data structures, algorithms, database management, web development, and more.',
        faculty: [
            { name: 'Dr. A. Kumar', designation: 'Head of Department', specialization: 'Artificial Intelligence' },
            { name: 'Prof. B. Singh', designation: 'Professor', specialization: 'Machine Learning' },
            { name: 'Dr. C. Devi', designation: 'Associate Professor', specialization: 'Cyber Security' },
            { name: 'Ms. D. Rao', designation: 'Assistant Professor', specialization: 'Web Technologies' },
        ],
        labs: [
            { name: 'Programming Lab', description: 'Equipped with modern computers and software for hands-on programming experience.' },
            { name: 'Networking Lab', description: 'Focuses on network configuration, security, and administration.' },
            { name: 'Data Science Lab', description: 'Dedicated to data analysis, machine learning, and big data technologies.' },
        ],
        courses: [
            { code: 'CE101', title: 'Introduction to Programming' },
            { code: 'CE201', title: 'Data Structures and Algorithms' },
            { code: 'CE301', title: 'Database Management Systems' },
            { code: 'CE401', title: 'Web Development' },
        ],
        activities: [
            'Coding Competitions',
            'Hackathons',
            'Guest Lectures by Industry Experts',
            'Student Projects on AI/ML',
        ],
        achievements: [
            'Students secured top ranks in state-level coding contests.',
            'Faculty published research papers in international journals.',
            'Department received funding for a smart campus project.',
        ],
        image: 'https://picsum.photos/seed/computer-engineering/800/600',
    },
    {
        id: 'electronics-engineering',
        name: 'Electronics Engineering',
        shortName: 'ECE',
        vision: 'To produce competent Electronics Engineers capable of contributing to technological advancements and sustainable development.',
        mission: 'To impart strong theoretical and practical knowledge in Electronics Engineering, encourage innovation, and foster a spirit of lifelong learning.',
        description: 'The Electronics Engineering Department focuses on the design, development, and testing of electronic circuits and systems. Students learn about analog and digital electronics, microcontrollers, communication systems, and embedded systems.',
        faculty: [
            { name: 'Dr. E. Prasad', designation: 'Head of Department', specialization: 'Embedded Systems' },
            { name: 'Prof. F. Reddy', designation: 'Professor', specialization: 'VLSI Design' },
            { name: 'Dr. G. Sharma', designation: 'Associate Professor', specialization: 'Communication Systems' },
        ],
        labs: [
            { name: 'Analog Electronics Lab', description: 'For experimenting with basic electronic components and circuits.' },
            { name: 'Digital Electronics Lab', description: 'Focuses on logic gates, combinational and sequential circuits.' },
            { name: 'Embedded Systems Lab', description: 'Hands-on experience with microcontrollers and IoT devices.' },
        ],
        courses: [
            { code: 'EC101', title: 'Basic Electronics' },
            { code: 'EC201', title: 'Digital Logic Design' },
            { code: 'EC301', title: 'Microcontrollers and Applications' },
        ],
        activities: [
            'Robotics Club',
            'Electronics Project Exhibition',
            'Workshops on PCB Design',
        ],
        achievements: [
            'Students developed an automated irrigation system.',
            'Department collaborated with local industries for internships.',
        ],
        image: 'https://picsum.photos/seed/electronics-engineering/800/600',
    },
    {
        id: 'electrical-engineering',
        name: 'Electrical Engineering',
        shortName: 'EEE',
        vision: 'To be a leading department in Electrical Engineering education and research, addressing global challenges in energy and power systems.',
        mission: 'To educate students with fundamental and advanced concepts in Electrical Engineering, promote research, and develop ethical professionals.',
        description: 'The Electrical Engineering Department covers a wide range of topics including power generation, transmission, distribution, electrical machines, control systems, and renewable energy. Students gain practical skills through laboratory work and projects.',
        faculty: [
            { name: 'Dr. H. Gupta', designation: 'Head of Department', specialization: 'Power Systems' },
            { name: 'Prof. I. Khan', designation: 'Professor', specialization: 'Renewable Energy' },
        ],
        labs: [
            { name: 'Electrical Machines Lab', description: 'For studying the characteristics and operation of various electrical machines.' },
            { name: 'Power Electronics Lab', description: 'Focuses on power converters and their applications.' },
        ],
        courses: [
            { code: 'EE101', title: 'Basic Electrical Engineering' },
            { code: 'EE201', title: 'Electrical Machines' },
            { code: 'EE301', title: 'Power Systems' },
        ],
        activities: [
            'Industrial Visits to Power Plants',
            'Energy Conservation Awareness Programs',
        ],
        achievements: [
            'Students designed a smart grid prototype.',
            'Department organized a national conference on sustainable energy.',
        ],
        image: 'https://picsum.photos/seed/electrical-engineering/800/600',
    },
    {
        id: 'mechanical-engineering',
        name: 'Mechanical Engineering',
        shortName: 'MECH',
        vision: 'To excel in Mechanical Engineering education and research, contributing to industrial growth and technological innovation.',
        mission: 'To provide a strong foundation in Mechanical Engineering principles, foster creativity, and prepare students for diverse career opportunities.',
        description: 'The Mechanical Engineering Department offers a robust curriculum in areas such as thermodynamics, fluid mechanics, manufacturing processes, machine design, and robotics. Students engage in hands-on projects and simulations.',
        faculty: [
            { name: 'Dr. J. Singh', designation: 'Head of Department', specialization: 'Robotics' },
            { name: 'Prof. K. Varma', designation: 'Professor', specialization: 'Thermal Engineering' },
        ],
        labs: [
            { name: 'Workshop Practice Lab', description: 'For hands-on training in various manufacturing processes.' },
            { name: 'Fluid Mechanics Lab', description: 'Experiments related to fluid properties and flow.' },
        ],
        courses: [
            { code: 'ME101', title: 'Engineering Mechanics' },
            { code: 'ME201', title: 'Thermodynamics' },
            { code: 'ME301', title: 'Machine Design' },
        ],
        activities: [
            'CAD/CAM Workshops',
            'Automobile Design Competitions',
        ],
        achievements: [
            'Students built a working prototype of a solar-powered vehicle.',
            'Department secured patents for innovative mechanical designs.',
        ],
        image: 'https://picsum.photos/seed/mechanical-engineering/800/600',
    },
    {
        id: 'civil-engineering',
        name: 'Civil Engineering',
        shortName: 'CIVIL',
        vision: 'To be a center of excellence in Civil Engineering, producing skilled professionals for infrastructure development and sustainable solutions.',
        mission: 'To educate students with core concepts of Civil Engineering, promote practical skills, and instill a commitment to ethical and sustainable practices.',
        description: 'The Civil Engineering Department focuses on the planning, design, construction, and maintenance of infrastructure projects. Students learn about structural analysis, transportation engineering, environmental engineering, and construction management.',
        faculty: [
            { name: 'Dr. L. Kumar', designation: 'Head of Department', specialization: 'Structural Engineering' },
            { name: 'Prof. M. Devi', designation: 'Professor', specialization: 'Transportation Engineering' },
        ],
        labs: [
            { name: 'Strength of Materials Lab', description: 'For testing the mechanical properties of construction materials.' },
            { name: 'Surveying Lab', description: 'Hands-on experience with surveying instruments and techniques.' },
        ],
        courses: [
            { code: 'CV101', title: 'Engineering Graphics' },
            { code: 'CV201', title: 'Strength of Materials' },
            { code: 'CV301', title: 'Structural Analysis' },
        ],
        activities: [
            'Site Visits to Construction Projects',
            'Workshops on AutoCAD and Staad.Pro',
        ],
        achievements: [
            'Students participated in national-level bridge design competitions.',
            'Department provided consultancy for local government projects.',
        ],
        image: 'https://picsum.photos/seed/civil-engineering/800/600',
    },
    {
        id: 'architectural-engineering',
        name: 'Architectural Engineering',
        shortName: 'ARCH',
        vision: 'To integrate engineering principles with architectural design, fostering innovative and sustainable built environments.',
        mission: 'To provide comprehensive education in architectural engineering, emphasizing structural design, building systems, and sustainable practices.',
        description: 'The Architectural Engineering Department focuses on the structural and mechanical aspects of buildings, combining engineering rigor with aesthetic design principles. Students learn about building materials, structural analysis, HVAC systems, and sustainable construction.',
        faculty: [
            { name: 'Dr. N. Sharma', designation: 'Head of Department', specialization: 'Sustainable Building Design' },
            { name: 'Prof. O. Singh', designation: 'Professor', specialization: 'Structural Analysis' },
        ],
        labs: [
            { name: 'Building Materials Lab', description: 'For testing properties of various construction materials.' },
            { name: 'CAD Lab', description: 'Equipped with software for architectural design and drafting.' },
        ],
        courses: [
            { code: 'AR101', title: 'Introduction to Architectural Engineering' },
            { code: 'AR201', title: 'Building Structures' },
            { code: 'AR301', title: 'HVAC Systems' },
        ],
        activities: [
            'Architectural Design Competitions',
            'Workshops on Green Building Technologies',
        ],
        achievements: [
            'Students won awards in national architectural design contests.',
            'Department collaborated on a smart city planning project.',
        ],
        image: 'https://picsum.photos/seed/architectural-engineering/800/600',
    },
    {
        id: 'automobile-engineering',
        name: 'Automobile Engineering',
        shortName: 'AUTO',
        vision: 'To be a leader in automobile engineering education and research, driving innovation in vehicle technology and sustainable mobility.',
        mission: 'To equip students with advanced knowledge in automobile engineering, focusing on vehicle design, manufacturing, and maintenance, and promoting research in emerging automotive technologies.',
        description: 'The Automobile Engineering Department provides specialized education in the design, development, manufacturing, and maintenance of automobiles. Students explore topics such as engine technology, vehicle dynamics, automotive electronics, and alternative fuels.',
        faculty: [
            { name: 'Dr. P. Rao', designation: 'Head of Department', specialization: 'Automotive Electronics' },
            { name: 'Prof. Q. Kumar', designation: 'Professor', specialization: 'Vehicle Dynamics' },
        ],
        labs: [
            { name: 'Automotive Engine Lab', description: 'For hands-on study of internal combustion engines.' },
            { name: 'Vehicle Dynamics Lab', description: 'Equipped for testing vehicle performance and stability.' },
        ],
        courses: [
            { code: 'AT101', title: 'Automotive Chassis' },
            { code: 'AT201', title: 'Automotive Engines' },
            { code: 'AT301', title: 'Vehicle Design' },
        ],
        activities: [
            'Go-Kart Design and Fabrication',
            'Workshops on Electric Vehicles',
        ],
        achievements: [
            'Students designed and built an award-winning electric vehicle.',
            'Department partnered with leading automotive companies for internships.',
        ],
        image: 'https://picsum.photos/seed/automobile-engineering/800/600',
    },
];

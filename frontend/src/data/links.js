export const links = [
    { to: '/', label: 'Home', exact: true },
    {
      to: '/academics',
      label: 'Academics',
      subLinks: [
        { to: '/academics/syllabus', label: 'Syllabus' },
        { to: '/academics/academic-achievements', label: 'Academic Achievements' },
        { to: '/academics/admissions', label: 'Admissions' },
      ],
    },
    
    {
      to: '/placements',
      label: 'Placements',
      subLinks: [
        { to: '/placements/overview', label: 'Placements' },
        { to: '/placements/coordinators', label: 'Placement Coordinators' },
        { to: '/placements/company', label: 'Company' },
      ],
    },
    {
      to: '/events',
      label: 'Events',
      subLinks: [
        { to: '/events/sports', label: 'Sports Events' },
        { to: '/events/academic', label: 'Academic Events' },
        { to: '/events/tech', label: 'Tech Events' },
        { to: '/events/cultural', label: 'Cultural Events' },
      ],
    },
    {
      to: '/departments',
      label: 'Departments',
      subLinks: [
        { to: '/departments/computer-engineering', label: 'Computer Engineering' },
        { to: '/departments/electronics-engineering', label: 'Electronics Engineering' },
        { to: '/departments/electrical-engineering', label: 'Electrical Engineering' },
        { to: '/departments/mechanical-engineering', label: 'Mechanical Engineering' },
        { to: '/departments/civil-engineering', label: 'Civil Engineering' },
      ],
    },
    { to: '/results', label: 'Results' },
    { to: '/about', label: 'About Us' },
    { to: '/alumni', label: 'Alumni' },
  ];
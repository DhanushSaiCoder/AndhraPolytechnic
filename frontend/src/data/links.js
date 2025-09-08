export const links = [
  { to: '/', label: 'Home', exact: true },
  {
    to: '/departments',
    label: 'Departments',
    subLinks: [
      { to: '/departments/computer-engineering', label: 'Computer Engineering' },
      { to: '/departments/electronics-engineering', label: 'Electronics Engineering' },
      { to: '/departments/electrical-engineering', label: 'Electrical Engineering' },
      { to: '/departments/mechanical-engineering', label: 'Mechanical Engineering' },
      { to: '/departments/civil-engineering', label: 'Civil Engineering' },
      { to: '/departments/architectural-engineering', label: 'Architectural Engineering' },
      { to: '/departments/automobile-engineering', label: 'Automobile Engineering' },
    ],
  },
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
  },
  {
    to: '/events',
    label: 'Events'
  },

  { to: '/results', label: 'Results' },
  { to: '/about', label: 'About Us' },
  { to: '/alumni', label: 'Alumni' },
];
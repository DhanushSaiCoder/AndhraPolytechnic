export const links = [
  { to: '/', label: 'Home', exact: true },
    {
    to: '/departments',
    label: 'Departments',
  },


  {
    to: '/placements',
    label: 'Placements',
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
    to: '/events',
    label: 'Events'
  },
  { to: '/about', label: 'About Us' },
  { to: '/alumni', label: 'Alumni' },
];
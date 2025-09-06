import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AchievementsPage from './pages/AchievementsPage';
import PlacementsPage from './pages/PlacementsPage';
import EventsPage from './pages/EventsPage';
import AlumniPage from './pages/AlumniPage';

import DepartmentsPage from './pages/DepartmentsPage';
import ResultsPage from './pages/ResultsPage';
import DepartmentPage from './pages/DepartmentPage';
import SyllabusPage from './pages/SyllabusPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// import NotFound from './pages/NotFound'; // optional

function App() {
  return (
    <div>
      <Header /> {/* always visible on all pages */}
      <NavigationBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="academics" element={<AcademicsPage />} />
        <Route path="academics/syllabus" element={<SyllabusPage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="placements" element={<PlacementsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="alumni" element={<AlumniPage />} />
        
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="departments/:deptName" element={<DepartmentPage />} />
        {/* catch-all route, optional */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

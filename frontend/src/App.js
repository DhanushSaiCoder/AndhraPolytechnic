import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AcademicAchievementsPage from './pages/AcademicAchievementsPage';
import PlacementsPage from './pages/PlacementsPage';
import EventsPage from './pages/EventsPage';
import AlumniPage from './pages/AlumniPage';
import AdmissionsPage from './pages/AdmissionsPage';

import DepartmentsPage from './pages/DepartmentsPage';

import DepartmentDetail from './pages/DepartmentDetail';
import SyllabusPage from './pages/SyllabusPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound'; // optional
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import UserManagementPage from './pages/UserManagementPage';
import PrivateRoute from './components/PrivateRoute';
import AdminContentPage from './pages/AdminContentPage'; // New import

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
        <Route path="academics/academic-achievements" element={<AcademicAchievementsPage />} />
        <Route path="academics/admissions" element={<AdmissionsPage />} />
        <Route path="placements" element={<PlacementsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="alumni" element={<AlumniPage />} />
        
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="/departments/:id" element={<DepartmentDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route index element={<AdminPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="content/*" element={<AdminContentPage />} /> {/* New route with nested routes */}
        </Route>
        {/* catch-all route, optional */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Departments from './pages/Departments';
import Results from './pages/Results';
import Department from './pages/Department';
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
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="departments" element={<Departments />} />
        <Route path="results" element={<Results />} />
        <Route path="departments/:deptName" element={<Department />} />
        {/* catch-all route, optional */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

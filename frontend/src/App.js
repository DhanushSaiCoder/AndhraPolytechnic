import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Departments from './pages/Departments';
import Results from './pages/Results';
// import NotFound from './pages/NotFound'; // optional

function App() {
  return (
    <div>
      <Header /> {/* always visible on all pages */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="departments" element={<Departments />} />
        <Route path="results" element={<Results />} />
        {/* catch-all route, optional */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;

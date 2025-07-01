import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Departments from './pages/Departments';
import Results from './pages/Results';

function App() {
  return (
    <div>
      <nav style={{ marginBottom: '1rem' }}>
        <NavLink 
          to="/" 
          end 
          style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Home
        </NavLink>
        <NavLink 
          to="/about" 
          style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
        >
          About
        </NavLink>
         <NavLink 
          to="/admissions" 
          style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Admissions
        </NavLink>
         <NavLink 
          to="/departments" 
          style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Departments
        </NavLink>
         <NavLink 
          to="/results" 
          style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Results
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="departments" element={<Departments />} />
        <Route path="results" element={<Results />} />
        
        {/* catch‑all */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;

// frontend/src/components/NavigationBar.js
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "../styles/Header.css";

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close when clicking outside (nice touch)
  useEffect(() => {
    const handleClick = (e) => {
      if (open && navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  const links = [
    { to: '/', label: 'Home', exact: true },
    { to: '/departments', label: 'Departments' },
    { to: '/admissions', label: 'Admissions' },
    { to: '/results', label: 'Results' },
    { to: '/about', label: 'About Us' },
  ];

  return (
    <nav className="headerNav" role="navigation" aria-label="Main">
      <div className="navInner" ref={navRef}>
        <button
          className={`hamburger ${open ? 'is-active' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-controls="primary-navigation"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {/* Simple accessible SVG hamburger */}
          <svg width="28" height="28" viewBox="0 0 100 80" aria-hidden="true">
            <rect width="100" height="12" rx="8"></rect>
            <rect y="30" width="100" height="12" rx="8"></rect>
            <rect y="60" width="100" height="12" rx="8"></rect>
          </svg>
        </button>

        <div
          id="primary-navigation"
          className={`navLinks ${open ? 'open' : ''}`}
        >
          {links.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                isActive ? 'navLink activeNavLink' : 'navLink'
              }
              style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
              onClick={() => setOpen(false)} // close on click
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
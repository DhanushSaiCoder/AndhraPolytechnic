// frontend/src/components/NavigationBar.js
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
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
      // if open and click is outside navInner -> close
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

  // Derive current page name
  const currentPage = links.find(link => {
    if (link.exact) {
      return location.pathname === link.to;
    }
    return location.pathname.startsWith(link.to);
  })?.label || 'Page';

  return (
    <nav
      className={`headerNav ${open ? 'open' : ''}`}
      role="navigation"
      aria-label="Main"
    >
      {/* BACKDROP: always present so it can fade in/out smoothly */}
      <div
        className="nav-backdrop"
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <div className="navInner" ref={navRef}>
        <button
          className={`hamburger ${open ? 'is-active' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-controls="primary-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          <svg width="28" height="28" viewBox="0 0 100 80" aria-hidden="true" focusable="false">
            <rect width="100" height="12" rx="8"></rect>
            <rect y="30" width="100" height="12" rx="8"></rect>
            <rect y="60" width="100" height="12" rx="8"></rect>
          </svg>
        </button>

        <span className="currentPageName">{currentPage}</span>

        <div
          id="primary-navigation"
          className={`navLinks ${open ? 'open' : ''}`}
          aria-hidden={!open}
        >
          {links.map(({ to, label, exact }, index) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                isActive ? 'navLink activeNavLink' : 'navLink'
              }
              style={{
                marginRight: 10,
                fontWeight: undefined, // keep CSS control
                '--i': index // used for stagger when open
              }}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
      {/* Login Button for Mobile */}
      <NavLink to="/login" className="loginButton">
        <LogIn size={20} />
        <span>Login</span>
      </NavLink>
    </nav>
  );
}

export default NavigationBar;
// frontend/src/components/NavigationBar.js
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LogIn, Home, BookOpen, Award, Briefcase, Calendar, Building, ClipboardList, Info, Users, ChevronDown } from 'lucide-react';
import "../styles/Header.css";

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef();

  const [activeDropdown, setActiveDropdown] = useState(null);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null); // Close dropdown on route change
  }, [location]);

  // Close when clicking outside (nice touch)
  useEffect(() => {
    const handleClick = (e) => {
      // if open and click is outside navInner -> close
      if (open && navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
        setActiveDropdown(null); // Close dropdown on outside click
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  const handleMouseEnter = (label) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const links = [
    { to: '/', label: 'Home', exact: true, Icon: Home },
    {
      to: '/academics',
      label: 'Academics',
      Icon: BookOpen,
      subLinks: [
        { to: '/academics/syllabus', label: 'Syllabus' },
        { to: '/academics/achievements', label: 'Academic Achievements' },
      ],
    },
    {
      to: '/achievements',
      label: 'Achievements',
      Icon: Award,
      subLinks: [
        { to: '/achievements/academic', label: 'Academic Achievements' },
        { to: '/achievements/sports', label: 'Sports Achievements' },
        { to: '/achievements/others', label: 'Others' },
      ],
    },
    {
      to: '/placements',
      label: 'Placements',
      Icon: Briefcase,
      subLinks: [
        { to: '/placements/overview', label: 'Placements' },
        { to: '/placements/coordinators', label: 'Placement Coordinators' },
        { to: '/placements/company', label: 'Company' },
      ],
    },
    {
      to: '/events',
      label: 'Events',
      Icon: Calendar,
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
      Icon: Building,
      subLinks: [
        { to: '/departments/computer-engineering', label: 'Computer Engineering' },
        { to: '/departments/electronics-engineering', label: 'Electronics Engineering' },
        { to: '/departments/electrical-engineering', label: 'Electrical Engineering' },
        { to: '/departments/mechanical-engineering', label: 'Mechanical Engineering' },
        { to: '/departments/civil-engineering', label: 'Civil Engineering' },
      ],
    },
    { to: '/results', label: 'Results', Icon: ClipboardList },
    { to: '/about', label: 'About Us', Icon: Info },
    { to: '/alumni', label: 'Alumni', Icon: Users },
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
          {links.map(({ to, label, exact, Icon, subLinks }, index) => (
            <div
              key={to}
              className="navLinkWrapper"
              onMouseEnter={() => handleMouseEnter(label)}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
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
                {Icon && <Icon size={20} />}
                <span>{label}</span>
                {subLinks && <ChevronDown size={16} className="dropdown-arrow" />}
              </NavLink>
              {subLinks && activeDropdown === label && (
                <div className={`dropdownMenu ${activeDropdown === label ? 'open' : ''}`}>
                  {subLinks.map((subLink) => (
                    <NavLink
                      key={subLink.to}
                      to={subLink.to}
                      className="dropdownItem"
                      onClick={() => setOpen(false)}
                    >
                      {subLink.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Login Button for Desktop */}
          <NavLink to="/login" className="desktopLoginButton">
            <LogIn size={20} />
            <span>Login</span>
          </NavLink>
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

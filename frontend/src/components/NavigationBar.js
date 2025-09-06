import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LogIn, Home, BookOpen, Award, Briefcase, Calendar, Building, ClipboardList, Info, Users, ChevronDown } from 'lucide-react';
import "../styles/Header.css";

const NavigationBar = () => {
  const [open, setOpen] = useState(false); // mobile panel open (hamburger)
  const location = useLocation();
  const navRef = useRef();

  const [activeDropdown, setActiveDropdown] = useState(null); // desktop hover/focus dropdown
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null); // mobile accordion dropdown
  const [isMobile, setIsMobile] = useState(false);

  // Track breakpoint so behavior can differ between desktop & mobile
  useEffect(() => {
    const mm = typeof window !== 'undefined' ? window.matchMedia('(max-width: 600px)') : null;
    const apply = () => setIsMobile(!!(mm && mm.matches));
    if (mm) {
      apply();
      mm.addEventListener('change', apply);
      return () => mm.removeEventListener('change', apply);
    }
    return undefined;
  }, []);

  // Close menu / dropdowns on route change
  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
  }, [location]);

  // Close when clicking outside - works for both desktop (hover/focus dropdowns) and mobile panel
  useEffect(() => {
    const handleClick = (e) => {
      if (!navRef.current) return;
      // if any menu state is open and click is outside navInner -> close all
      if ((open || activeDropdown || mobileActiveDropdown) && !navRef.current.contains(e.target)) {
        setOpen(false);
        setActiveDropdown(null);
        setMobileActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open, activeDropdown, mobileActiveDropdown]);

  const links = [
    { to: '/', label: 'Home', exact: true, Icon: Home },
    {
      to: '/academics',
      label: 'Academics',
      Icon: BookOpen,
      subLinks: [
        { to: '/academics/programs-offered', label: 'Programs Offered' },
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

  // Helpers for accessibility / toggles
  const isDropdownOpen = (label) => activeDropdown === label || mobileActiveDropdown === label;

  const toggleMobileDropdown = (label) => {
    setMobileActiveDropdown(prev => (prev === label ? null : label));
  };

  return (
    <nav
      className={`headerNav ${open ? 'open' : ''}`}
      role="navigation"
      aria-label="Main"
    >
      {/* BACKDROP: always present so it can fade in/out smoothly */}
      <div
        className="nav-backdrop"
        onClick={() => {
          setOpen(false);
          setMobileActiveDropdown(null);
        }}
        aria-hidden={!open}
      />

      <div className="navInner" ref={navRef}>
        <button
          className={`hamburger ${open ? 'is-active' : ''}`}
          onClick={() => setOpen(v => {
            // when opening mobile panel, clear desktop hover state
            if (!v) setActiveDropdown(null);
            return !v;
          })}
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
          aria-hidden={!open && isMobile}
        >
          {links.map((link, index) => (
            <div
              key={link.to}
              className={`navLinkWrapper ${isDropdownOpen(link.label) ? 'active' : ''}`}
              // Desktop hover shows dropdown (only when not on mobile)
              onMouseEnter={() => { if (!isMobile) setActiveDropdown(link.label); }}
              onMouseLeave={() => { if (!isMobile) setActiveDropdown(null); }}
            >
              <NavLink
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  isActive ? 'navLink activeNavLink' : 'navLink'
                }
                style={{
                  marginRight: 10,
                  fontWeight: undefined, // keep CSS control
                  '--i': index // used for stagger when open
                }}
                onClick={(e) => {
                  if (link.subLinks) {
                    if (isMobile) {
                      // on mobile: prevent navigation and toggle accordion
                      e.preventDefault();
                      toggleMobileDropdown(link.label);
                    } else {
                      // on desktop: allow normal navigation when user clicks a parent
                      // do nothing special (hover already opens dropdown)
                    }
                  } else {
                    // regular link: close mobile panel if it was open
                    setOpen(false);
                    setActiveDropdown(null);
                    setMobileActiveDropdown(null);
                  }
                }}
                // keyboard support: toggle mobile dropdown with Enter/Space when on mobile
                onKeyDown={(e) => {
                  if (link.subLinks && isMobile && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    toggleMobileDropdown(link.label);
                  }
                }}
                aria-haspopup={!!link.subLinks}
                aria-expanded={link.subLinks ? !!isDropdownOpen(link.label) : undefined}
                aria-controls={link.subLinks ? `dropdown-${link.label.replace(/\s+/g, '-').toLowerCase()}` : undefined}
              >
                {link.Icon && <link.Icon size={20} />}
                <span>{link.label}</span>
                {link.subLinks && <ChevronDown size={16} className="dropdown-arrow" aria-hidden="true" />}
              </NavLink>

              {link.subLinks && (isDropdownOpen(link.label)) && (
                <div
                  id={`dropdown-${link.label.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`dropdownMenu ${(isDropdownOpen(link.label)) ? 'open' : ''}`}
                  role="menu"
                >
                  {link.subLinks.map((subLink) => (
                    <NavLink
                      key={subLink.to}
                      to={subLink.to}
                      className="dropdownItem"
                      onClick={() => {
                        // clicking a sub-item should always close the mobile panel
                        setOpen(false);
                        setActiveDropdown(null);
                        setMobileActiveDropdown(null);
                      }}
                      role="menuitem"
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

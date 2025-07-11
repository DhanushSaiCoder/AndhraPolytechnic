
import React from 'react';
import { NavLink } from 'react-router-dom';

import "../styles/Header.css";

const NavigationBar = () => {
    return (
        <nav className='headerNav'>
            <NavLink
                to="/"
                end
                className={({ isActive }) => isActive ? 'navLink activeNavLink' : 'navLink'}
                style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
            >
                Home
            </NavLink>
            <NavLink
                to="/departments"
                className={({ isActive }) => isActive ? 'navLink activeNavLink' : 'navLink'}
                style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
            >
                Departments
            </NavLink>
            {/* <NavLink
                to="/admissions"
                className={({ isActive }) => isActive ? 'navLink activeNavLink' : 'navLink'}
                style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
            >
                Admissions
            </NavLink>
            <NavLink
                to="/results"
                className={({ isActive }) => isActive ? 'navLink activeNavLink' : 'navLink'}
                style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
            >
                Results
            </NavLink> */}
            <NavLink
                to="/about"
                className={({ isActive }) => isActive ? 'navLink activeNavLink' : 'navLink'}
                style={({ isActive }) => ({ marginRight: 10, fontWeight: isActive ? 'bold' : 'normal' })}
            >
                About Us
            </NavLink>
        </nav>
    );
}

export default NavigationBar;

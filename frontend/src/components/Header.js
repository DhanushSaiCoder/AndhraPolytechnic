import React from 'react';
import { NavLink } from 'react-router-dom';

import "../styles/Header.css";

const Header = () => {
    return (
        <div className='Header'>
            <div className='headerContent'>
                <div className='clgLogoDiv'></div>
                <h1 className='clgTitle'>ANDHRA POLYTECHNIC</h1>
                <div className='sbtetLogoDiv'></div>

            </div>
            <nav style={{ marginBottom: '1rem' }} className='headerNav'>
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


        </div>
    );
}

export default Header;

import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer style={{ backgroundColor: '#112D4E', color: '#F9F7F7', padding: '20px', textAlign: 'center' }}>
                <p>&copy; {new Date().getFullYear()} Andhra Polytechnic. All rights reserved.</p>
                <p>Developed by Dhanu</p>
            </footer>
        </div>
    );
}   

export default Footer;

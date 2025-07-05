// Footer.jsx
import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* College Info */}
          <div className="footer-col info-col">
            <div className="logo-section">
              <div className='clgLogoDiv footerLogo'></div>

              <div>
                <h3 className="college-name">ANDHRA POLYTECHNIC</h3>
                <p className="college-location">Kakinada, Andhra Pradesh</p>
              </div>
            </div>

            <p className="college-desc">
              Committed to providing quality technical education and fostering innovation.
              Empowering students with the skills and knowledge necessary to excel in their chosen fields.
            </p>

            <div className="contact-list">
              <div className="contact-item">
                <MapPin size={18} />
                <span>Kakinada, Andhra Pradesh, India</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>099123 42010</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>principal_apt@yahoo.co.in</span>
              </div>
              <div className="contact-item">
                <Globe size={18} />
                <span>www.andhrapolytechnic.edu.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col links-col">
            <h4>Quick Links</h4>
            <ul>
              {['About Us', 'Admissions', 'Departments', 'Faculty', 'Results', 'Placements'].map((link, i) => (
                <li key={i}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col links-col">
            <h4>Resources</h4>
            <ul>
              {['Library', 'Campus Life', 'Student Portal', 'Downloads', 'Contact Us', 'Alumni'].map((res, i) => (
                <li key={i}><a href="#">{res}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Andhra Polytechnic. All rights reserved.</p>
          <p className="dev-note">Developed with ❤️ for educational excellence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

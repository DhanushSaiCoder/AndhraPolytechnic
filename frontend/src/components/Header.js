// frontend/src/components/Header.js
import React from 'react';
import "../styles/Header.css";
import clgLogo from '../images/clgLogo.png';
import sbtetLogo from '../images/sbtetLogo.jpeg';

const Header = () => {
  return (
    <header className="Header" role="banner">
      <div className="headerContent">
        <div className="logoWrap">
          <img src={clgLogo} alt="College logo" className="clgLogoImg" />
        </div>

        <div className='clgTitleDiv'>
          <h1 className='clgTitle'>ANDHRA POLYTECHNIC</h1>
          <h2 className='clgSubtitle'>KAKINADA, ANDHRA PRADESH</h2>
        </div>

        <div className="logoWrap rightLogo">
          <img src={sbtetLogo} alt="SBTET logo" className="sbtetLogoImg" />
        </div>
      </div>
    </header>
  );
}

export default Header;
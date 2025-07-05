import React from 'react';

import "../styles/Header.css";

const Header = () => {
    return (
        <div className='Header'>
            <div className='headerContent'>
                <div className='clgLogoDiv'></div>
                <div className='clgTitleDiv'>

                    <h1 className='clgTitle'>ANDHRA POLYTECHNIC</h1>
                    <h2 className='clgSubtitle'>KAKINADA, ANDHRA PRADESH</h2>
                </div>
                <div className='sbtetLogoDiv'></div>

            </div>
        </div>
    );
}

export default Header;

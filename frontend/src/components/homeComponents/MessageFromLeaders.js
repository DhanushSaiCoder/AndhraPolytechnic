import React from 'react';
import CommissionerMessage from './CommissionerMessage';
import PrincipalMessage from './PrincipalMessage';
import "../../styles/HomeStyles/MessageFromLeaders.css";
const MessageFromLeaders = () => {
    return (
        <div className='MessageFromLeaders'>
            <div className="Message_header">
                <h1 className="Message_title">Message From Leaders</h1>
                <p className="Message_subtitle">
                    A Message to Encourage and Guide
                </p>
            </div>
            <CommissionerMessage />
            <PrincipalMessage />
        </div>
    );
}

export default MessageFromLeaders;

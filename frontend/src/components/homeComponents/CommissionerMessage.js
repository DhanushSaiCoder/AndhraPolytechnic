import React from 'react';
import '../../styles/HomeStyles/CommissionerMessage.css';
import commImg from '../../images/commissionerImg.jpeg'
const CommissionerMessage = () => {
    return (
        <div className='CommissionerMessage'>
            <div className='commissionerImgAndName'>
                <img className='commImg' src={commImg} alt="Commissioner's Image" />
                <h3 className='commName'>Smt. Nagarani Chadalawada, <span>IAS</span></h3>
                <p className='commRole'>Director Of Technical Education</p>
            </div>

            <div className='comm-message'>
                <p>
                    Welcome to the Andhra Polytechnic College, where we are committed to providing quality technical education and fostering innovation. Our institution is dedicated to empowering students with the skills and knowledge necessary to excel in their chosen fields. We believe in nurturing talent, promoting creativity, and instilling a strong work ethic in our students. Join us on this journey of academic excellence and personal growth.
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><path d="M82.87 129.48S77.32 98.96 114.31 74c-12.95 0-89.7 30.52-89.7 113.74 0 33.09 27.59 59.73 61.01 58.19 29.85-1.37 54.07-25.6 55.44-55.45 1.54-33.41-25.1-61-58.19-61zm154.26 0S231.58 98.96 268.57 74c-12.95 0-89.7 30.52-89.7 113.74 0 33.09 27.58 59.73 61.01 58.19 29.85-1.37 54.07-25.6 55.44-55.45 1.54-33.41-25.1-61-58.19-61z" fill="#3F72AF"></path></svg>
                </p>
            </div>
        </div>
    );
}

export default CommissionerMessage;

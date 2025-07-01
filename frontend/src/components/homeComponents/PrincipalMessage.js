import React from 'react';
import prpImg from '../../images/commissionerImg.jpeg'
import '../../styles/HomeStyles/PrincipalMessage.css';
const PrincipalMessage = () => {
    return (
        <div className='PrincipalMessage'>
            <div className='princialImgAndName'>
                <img className='prpImg' src={prpImg} alt="Commissioner's Image" />
                <h3 className='prpName'>Sri K.S. Vara Prasad, <span>PHD</span></h3>
                <p className='prpRole'>Principal</p>
            </div>

            <div className='prpMessage'>
                <p>
                    Dear Students, Faculty, and Esteemed Visitors,

                    It gives me immense pleasure to welcome you to our institution — a place where tradition meets innovation and where every learner is encouraged to dream big and strive for excellence.

                    At the heart of our college lies a commitment to holistic development. We believe education extends beyond classrooms and textbooks. It is about nurturing critical thinking, fostering creativity, and building resilience that will empower our students to thrive in a rapidly changing world.

                    Our dedicated faculty, modern facilities, and diverse programs are designed to bring out the best in every student. Together, we aim to create an environment that values discipline, integrity, and a lifelong love of learning.
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><path d="M82.87 129.48S77.32 98.96 114.31 74c-12.95 0-89.7 30.52-89.7 113.74 0 33.09 27.59 59.73 61.01 58.19 29.85-1.37 54.07-25.6 55.44-55.45 1.54-33.41-25.1-61-58.19-61zm154.26 0S231.58 98.96 268.57 74c-12.95 0-89.7 30.52-89.7 113.74 0 33.09 27.58 59.73 61.01 58.19 29.85-1.37 54.07-25.6 55.44-55.45 1.54-33.41-25.1-61-58.19-61z" fill="#3F72AF"></path></svg>
                </p>
            </div>
        </div>
    );
}

export default PrincipalMessage;

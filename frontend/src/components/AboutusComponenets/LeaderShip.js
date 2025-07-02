import React from 'react'
import profile from '../../images/profile.jpg'
import '../../styles/AboutUsStyles/Leadership.css'

const LeaderShip = () => {

    const events = [
    { year: '1946', title: 'Established 1946' },
    { year: '1993', title: 'NACA Attcitation' },
    { year: '1988', title: 'AITCE Accreditation' },
    { year: '2023', title: 'NBA Accreditation' },
  ];

    return (
        <div className='LeaderShip'>
            <div className='LeadershipDiv'>
                <div className='PrincipleImgDiv'>
                    <img className='PrincipleImg' src={profile} alt="" />
                </div>
                <div className='PrincipleMessage'>
                    <div className='MessageDetails'>
                        <h1 className='MessageTitle'>Message form principle</h1>
                        <p className='MessagePara'><span className='SpanForMessage'>Welcome to Andhra Polytechnic College</span>, where learning meets excellence. Our mission is to provide quality technical education that empowers students with knowledge, skills, and values. With a legacy of over 75 years, our institution is committed to nurturing young minds into competent professionals ready to meet the challenges of the industry. We focus on holistic development, encouraging innovation, discipline, and leadership among our students. I invite you to explore the opportunities here and be a part of our journey towards a brighter future.</p>
                        <p className='EndParaForMessage'> - Principal, Andhra Polytechnic College</p>
                    </div>
                </div>
            </div>
            <div className="timeline-container">
            <h2>Timeline</h2>
            <div className="timeline">
                {events.map((event, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-year">{event.year}</div>
                        <div className="timeline-title">{event.title}</div>
                    </div>
                ))}
            </div>
        </div>
        </div >
    )
}

export default LeaderShip
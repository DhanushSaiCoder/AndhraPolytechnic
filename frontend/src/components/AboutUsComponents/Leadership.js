import React from 'react'
import profile from '../../images/profile.jpg'
import '../../styles/AboutUsStyles/Leadership.css'

const Leadership = () => {

    return (
        <div className='Leadership'>
            <div className='LeadershipDiv'>
                <div className='PrincipleImgDiv'>
                    <img className='PrincipleImg' src={profile} alt="" />
                </div>
                <div className='PrincipleMessage'>
                    <div className='MessageDetails'>
                        <h1 className='MessageTitle'>Message form principle</h1>
                        <p className='MessagePara'><span className='SpanForMessage'>Welcome to Andhra Polytechnic College</span>, where learning meets excellence. Our mission is to provide quality technical education that empowers students with knowledge, skills, and values. With a legacy of over 75 years, our institution is committed to nurturing young minds into competent professionals ready to meet the challenges of the industry. We focus on holistic development, encouraging innovation, discipline, and leadership among our students. I invite you to explore the opportunities here and be a part of our journey towards a brighter future.</p>
                        <p className='end-para-for-message'> - Principal, Andhra Polytechnic College</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Leadership
import React from 'react'
import '../../styles/HomeStyles/Departments.css'

const Departments = () => {

    const stats = [
        {
            Title: 'ECE',
            Description: 'The Electronics and Communication Engineering (ECE) branch focuses on electronic devices, circuits, and communication systems, preparing students with practical and technical skills for careers in electronics and modern communication industries.'

        },
        {
            Title: 'CME',
            Description: 'The Electronics and Communication Engineering (ECE) branch focuses on electronic devices, circuits, and communication systems, preparing students with practical and technical skills for careers in electronics and modern communication industries.'

        },
        {
            Title: 'EEE',
            Description: 'The Electronics and Communication Engineering (ECE) branch focuses on electronic devices, circuits, and communication systems, preparing students with practical and technical skills for careers in electronics and modern communication industries.'
        },
        {
            Title: 'MEC',
            Description: 'The Electronics and Communication Engineering (ECE) branch focuses on electronic devices, circuits, and communication systems, preparing students with practical and technical skills for careers in electronics and modern communication industries.'
        },
        {
            Title: 'AUT',
            Description: 'The Electronics and Communication Engineering (ECE) branch focuses on electronic devices, circuits, and communication systems, preparing students with practical and technical skills for careers in electronics and modern communication industries.'
        },
        {
            Title: 'CIV',
            Description: 'The Electronics and Communication Engineering (ECE) branch focuses on electronic devices, circuits, and communication systems, preparing students with practical and technical skills for careers in electronics and modern communication industries.'
        },
        {
            Title: 'ARC',
            Description: 'The Electronics and Communication Engineering (ECE) branch focuses on electronic devices, circuits, and communication systems, preparing students with practical and technical skills for careers in electronics and modern communication industries.'
        },
    ];
    return (
        <div className='Depatments'>
            <div className='DepatmentsTitleDiv'>
                <h1 className='DepatmentsTitle'>Departments</h1>
                <p className='DepatmentsNote'>The Departments section displays the college’s academic branches, courses, and facilities, helping visitors easily explore its academic strengths.</p>
            </div>
            <div className='DepatmentBranchesDiv'>
                {stats.map((stat, idx) => {
                    return (
                        <div key={idx} className="BranchsDiv">
                            <h1>
                                {stat.Title}
                            </h1>
                            <div className='BranchDescription'>
                                {stat.Description}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Departments
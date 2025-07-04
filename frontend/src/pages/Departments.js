import React from 'react';
import { Link } from 'react-router-dom';
import { departmentsData } from '../data/departmentsData';
import '../styles/DepartmentsStyles/Departments.css';

const Departments = () => {
    return (
        <div className='departments-container'>
            {departmentsData.map((department) => (
                <div key={department.id} className='department-card'>
                    <div className='department-header'>
                        <img src={department.departmentIcon} alt={`${department.departmentName} icon`} className='department-icon' />
                        <div className='department-info'>
                            <h2>{department.departmentName}</h2>
                            <p>Head of Department: {department.headOfDepartment}</p>
                        </div>
                    </div>
                    <div className='department-body'>
                        <p>{department.description}</p>
                    </div>
                    <div className='department-details'>
                        <div>
                            <h4>Total Seats</h4>
                            <p>{department.totalSeats}</p>
                        </div>
                        <div>
                            <h4>Highest Package</h4>
                            <p>{department.highestPackage.packageCTC} ({department.highestPackage.companyName})</p>
                        </div>
                        <div>
                            <h4>Average Package</h4>
                            <p>{department.averagePackage}</p>
                        </div>
                    </div>
                    <div className='department-links'>
                        <Link to={department.viewFactulty}>View Faculty</Link>
                        <Link to={department.viewCurriculum}>View Curriculum</Link>
                    </div>
                    <div className='labs-section'>
                        <h3>Labs</h3>
                        <div className='labs-grid'>
                            {department.labs.map((lab, index) => (
                                <div key={index} className='lab-card'>
                                    <img src={lab.labImage} alt={`${lab.labName} image`} className='lab-image' />
                                    <div className='lab-info'>
                                        <h4>{lab.labName}</h4>
                                        <p>{lab.labDescription}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Departments;

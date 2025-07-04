import React from 'react';
import { useParams } from 'react-router-dom';

const Department = () => {
    const { deptName } = useParams();

    return (
        <div>
            <h1>Department: {deptName}</h1>
            {/* You can add more department-specific content here */}
        </div>
    );
};

export default Department;

import React from 'react';
import '../styles/ResultsStyles/ResultsPage.css';

const dummyResults = [
  { id: 1, name: 'John Doe', rollNo: 'AP101', course: 'Diploma in CSE', semester: '1st', grade: 'A', score: 92 },
  { id: 2, name: 'Jane Smith', rollNo: 'AP102', course: 'Diploma in ECE', semester: '1st', grade: 'B+', score: 88 },
  { id: 3, name: 'Peter Jones', rollNo: 'AP103', course: 'Diploma in EEE', semester: '1st', grade: 'A-', score: 90 },
  { id: 4, name: 'Alice Brown', rollNo: 'AP104', course: 'Diploma in Civil', semester: '1st', grade: 'B', score: 85 },
  { id: 5, name: 'Bob White', rollNo: 'AP105', course: 'Diploma in Mech', semester: '1st', grade: 'A', score: 95 },
];

const ResultsPage = () => {
  return (
    <div className="results-page">
      <p>Results Page</p>
    </div>
  );
};

export default ResultsPage;
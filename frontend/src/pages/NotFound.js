import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 200px)', // Adjust based on your header/footer height
      textAlign: 'center',
      backgroundColor: '#F9F7F7',
      color: '#112D4E',
    },
    title: {
      fontSize: '6rem',
      fontWeight: 'bold',
      margin: '0',
    },
    message: {
      fontSize: '1.5rem',
      marginBottom: '2rem',
    },
    link: {
      fontSize: '1.2rem',
      color: '#3F72AF',
      textDecoration: 'none',
      border: '1px solid #3F72AF',
      padding: '10px 20px',
      borderRadius: '5px',
      transition: 'background-color 0.3s, color 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link} 
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#3F72AF';
              e.target.style.color = '#F9F7F7';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#3F72AF';
            }}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
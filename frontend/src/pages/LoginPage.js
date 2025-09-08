import React from 'react';
import LoginForm from '../components/AuthComponents/LoginForm';
import '../styles/AuthStyles/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-form-card">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

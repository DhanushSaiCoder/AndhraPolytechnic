import React from 'react';
import LoginForm from '../components/AuthComponents/LoginForm';
import '../styles/Auth.css';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Login to Your Account</h2>
            <p>Enter your credentials to continue</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

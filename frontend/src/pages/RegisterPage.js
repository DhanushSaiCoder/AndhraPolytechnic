import React from 'react';
import RegisterForm from '../components/AuthComponents/RegisterForm';
import '../styles/Auth.css';

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Create Your Account</h2>
            <p>Fill in your details to get started</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

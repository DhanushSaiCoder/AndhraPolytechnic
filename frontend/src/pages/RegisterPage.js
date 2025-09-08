import React from 'react';
import RegisterForm from '../components/AuthComponents/RegisterForm';
import '../styles/AuthStyles/LoginPage.css'; // Reusing the same styling

const RegisterPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-form-card">
        <h1>Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;

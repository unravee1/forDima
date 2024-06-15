import React from 'react';
import AuthForm from '../components/AuthForm.js';

const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4">
      <AuthForm type="register" />
    </div>
  );
};

export default RegisterPage;

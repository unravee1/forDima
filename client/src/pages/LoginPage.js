import React from 'react';
import AuthForm from '../components/AuthForm.js';

const LoginPage = () => {
  return (
    <div className="container mx-auto px-4">
      <AuthForm type="login" />
    </div>
  );
};

export default LoginPage;


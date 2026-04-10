import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If there is no token, redirect to the login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If there is a token, allow the user to see the page
  return children;
};

export default ProtectedRoute;
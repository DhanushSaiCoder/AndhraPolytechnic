import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = () => {
  const user = authService.getCurrentUser();
  const userRole = authService.getUserRole();

  return user && userRole === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, role, allowedRoles }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;

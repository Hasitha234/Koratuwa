import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedPaths }) => {
  const location = useLocation();

  if (!allowedPaths.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

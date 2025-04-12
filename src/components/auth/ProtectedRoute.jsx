import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation(); // Get the current location

  if (!isAuthenticated) {
    // If not logged in and trying to access protected route → redirect to login
    // Save the location they were trying to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // User is authenticated, allow access to protected route
  return children;
};

export default ProtectedRoute;
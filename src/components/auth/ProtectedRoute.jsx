import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation(); // Get the current location
  
  

  if (!isAuthenticated) {
     // If not logged in and trying to access protected route → redirect to login
    if (location.pathname !== '/login' && location.pathname !== '/signup') {  
      return <Navigate to="/login" replace />;
    }
    // allow access to login and signup pages
    return children;
  } else {
    // If logged in and trying to go to login/signup → redirect to home
    if (location.pathname === '/login' || location.pathname === '/signup') {
     
      return <Navigate to="/" replace />;

    }
    // All access to protected Pages
    return children;
  }
};

export default ProtectedRoute;
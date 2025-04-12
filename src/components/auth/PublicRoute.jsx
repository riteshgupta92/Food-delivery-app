import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * PublicRoute component prevents authenticated users from accessing routes like login and signup
 * If user is authenticated, they are redirected to the home page
 */
const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auth);

    // If user is authenticated, redirect to home page
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // If not authenticated, allow access to the public route
    return children;
};

export default PublicRoute;
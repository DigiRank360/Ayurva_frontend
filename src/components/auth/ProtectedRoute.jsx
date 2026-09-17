import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingOverlay from '../ui/LoadingOverlay';

const ProtectedRoute = ({ children, redirectTo = '/' }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading while checking auth status
    if (isLoading) {
        return <LoadingOverlay isLoading={true} message="Loading..." fullScreen={true} />;
    }

    // If not authenticated, redirect to home
    // Save the attempted location for redirect after login
    if (!isAuthenticated) {
        console.log('🔒 Protected route - redirecting to login');
        // Store the location they were trying to access
        sessionStorage.setItem('redirectAfterLogin', location.pathname);
        return <Navigate to={redirectTo} state={{ from: location, showLogin: true }} replace />;
    }

    // Authenticated - render the protected content
    return children;
};

export default ProtectedRoute;

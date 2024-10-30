import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { authStore } from '../stores/authStore';

function ProtectedRoute() {
    const auth = useStore(authStore);

    // If not authenticated, redirect to login
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render the child components
    else { 

        return <Outlet />;
    }
}

export default ProtectedRoute;

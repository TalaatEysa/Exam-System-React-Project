import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles}) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" />;
    }
    if (allowedRoles && !allowedRoles.includes(user.user_type)) {
        // If user does not have the required role, redirect to unauthorized page
        return <Navigate to="/404" />;
    }
    return <Component />;
};

export default ProtectedRoute;

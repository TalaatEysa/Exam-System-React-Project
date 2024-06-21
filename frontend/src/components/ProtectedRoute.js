import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles}) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/404" />;
    }
    return <Component />;
};

export default ProtectedRoute;

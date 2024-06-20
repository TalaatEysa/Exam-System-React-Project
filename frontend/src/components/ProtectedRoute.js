import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token); // Get token from Redux store

  return token ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

import React  from 'react';
import { useSelector } from 'react-redux';
import { Navigate,  } from 'react-router-dom';


  const PrivateRoute = ({ children}) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
 
  // Check if the user is authenticated and has the required role
  const userHasRequiredRole = user && user.user_type ? true :false;
  // If authenticated and has required role, render the child components
  if (isAuthenticated && userHasRequiredRole) {
    return  children
  }

  // Redirect to login if not authenticated or doesn't have required role
  return <Navigate to="/login" replace />;
};

export default PrivateRoute
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';

function Auth({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login/admin" state={{ from: location }} replace />;
  }

  return children;
}

export default Auth;

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../features/auth/authSlice';
import { ClipLoader } from 'react-spinners'; // Import the spinner

const ProtectedRoute = ({ element, redirectTo }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(checkAuth());
    }
  }, [dispatch, status, checkAuth]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen"> 
        <ClipLoader color="#000" size={50} /> {/* Add spinner */}
      </div>
    );
  }

  // Redirect based on the user's presence and intended route
  if (redirectTo === '/' || redirectTo === '/register') {
    // If a user exists, redirect from login and register pages
    if (currentUser) {
      return <Navigate to="/todos" />;
    }
  } else if (redirectTo === '/todos') {
    // If no user exists, redirect from todos page
    if (!currentUser) {
      return <Navigate to="/" />;
    }
  }

  return element;
};

export default ProtectedRoute;

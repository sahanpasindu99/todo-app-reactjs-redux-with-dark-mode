// src/hooks/useRedirectIfNotAuthenticated.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useRedirectIfNotAuthenticated = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate('/', { replace: true }); // Redirect to login page if not authenticated
    }
  }, [currentUser, navigate]);
};

export default useRedirectIfNotAuthenticated;

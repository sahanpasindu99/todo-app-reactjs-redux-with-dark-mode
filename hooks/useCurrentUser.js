import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(checkAuth()); // Fetch the current user on mount
    }
  }, [dispatch, status]);

  useEffect(() => {
      if (currentUser) {
        navigate('/todos'); // Redirect to /todos if there's a current user
      } else {
        navigate('/'); // Redirect to login page if there's no current user
      }
  }, [currentUser, navigate, status]);

  return { currentUser, status };
};

export default useCurrentUser;

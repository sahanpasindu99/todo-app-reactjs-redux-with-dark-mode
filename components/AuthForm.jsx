import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { login, register, loadUsers } from '../features/auth/authSlice';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import logo1 from '../src/assets/logo1.png';
import login2 from '../src/assets/login2.svg';

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = type === 'login';
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email must be entered'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password must be entered'),
    ...(isLogin ? {} : { name: Yup.string().required('Name must be entered') }),
  });

  const handleSubmit = async (values) => {
    try {
      if (isLogin) {
        await dispatch(login({ email: values.email, password: values.password })).unwrap();
        toast.success("Successfully Logged In");
        navigate('/todos');
      } else {
        await dispatch(register({ email: values.email, password: values.password, name: values.name })).unwrap();
        toast.success("Successfully Registered");
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-none'}`} style={{ height: 'calc(100vh - 65px)' }}>
      <div className={`z-[2] w-full max-w-sm px-3 py-5 bg-${darkMode ? 'gray-800' : 'none'} rounded-lg `}>
        <div className="flex justify-center mb-3">
          <img src={logo1} alt="Auth" className="object-cover w-16 h-16" />
        </div>
        <h2 className={`mb-2 text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {isLogin ? 'Login to Your Account' : 'Create a New Account'}
        </h2>
        <p className={`mb-3 text-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {isLogin
            ? 'Don\'t have an account?'
            : 'Already have an account?'}
          <button
            type="button"
            onClick={() => navigate(isLogin ? '/register' : '/')}
            className="ml-1 text-blue-500 hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
        <Formik
          initialValues={{ email: '', password: '', name: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="relative mb-2">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <div className="relative mt-1">
                <FaEnvelope className={`absolute text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} top-3 left-3`} />
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={`block w-full py-2.5 pl-9 pr-4 text-xs border rounded-md shadow-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-800'} focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              <ErrorMessage name="email" component="div" className="mt-1 text-xs text-red-600" />
            </div>
            <div className="relative mb-2">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <div className="relative mt-1">
                <FaLock className={`absolute text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} top-3 left-3`} />
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={`block w-full py-2.5 pl-9 pr-4 text-xs border rounded-md shadow-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-800'} focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              <ErrorMessage name="password" component="div" className="mt-1 text-xs text-red-600" />
            </div>
            {!isLogin && (
              <div className="relative mb-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                <div className="relative mt-1">
                  <FaUser className={`absolute text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} top-3 left-3`} />
                  <Field
                    name="name"
                    type="text"
                    placeholder="Name"
                    className={`block w-full py-2.5 pl-9 pr-4 text-xs border rounded-md shadow-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-800'} focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                <ErrorMessage name="name" component="div" className="mt-1 text-xs text-red-600" />
              </div>
            )}
            <button
              type="submit"
              className={`w-full px-3 py-3 mt-3.5 mb-2 text-xs font-semibold rounded-md shadow-sm ${darkMode ? 'bg-black text-white hover:bg-gray-950' : 'bg-black text-white hover:bg-gray-800'}`}
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </Form>
        </Formik>
      </div>
      <div className="absolute bottom-0 right-0 p-4 z-[1] hidden md:block">
        <img src={login2} alt="Background" className="h-auto w-80" draggable={false} />
      </div>
    </div>
  );
};

export default AuthForm;

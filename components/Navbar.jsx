import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { toggleDarkMode } from '../features/mode/darkModeSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import logo1 from '../src/assets/logo1.png';
import { FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import ToggleButton from './ToggleButton';
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const todos = useSelector((state) => state.todos.todos);
  const userTodos = todos.filter(todo => todo.userEmail === currentUser?.email) || [];
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };
  
  const darkMode = useSelector((state) => state.darkMode.darkMode); // Get dark mode state

  const [showHoverCard, setShowHoverCard] = useState(false);
  const profileButtonRef = useRef(null);

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate('/');
  };

  const toggleHoverCard = () => {
    setShowHoverCard(prev => !prev);
  };

  // Close hover card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
        setShowHoverCard(false);
      }
    };

    if (showHoverCard) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHoverCard]);

  const isTodosPage = location.pathname === '/todos';

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <nav className={`px-6 py-4 h-[64px] shadow-bottom-only  ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}>
      <div className="flex items-center justify-between max-w-6xl mx-auto ">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 !pb-2">
          <img src={logo1} alt="Logo" className="w-auto h-7" />
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            Scheduler
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex items-center space-x-4">
          {/* Dark Mode Toggle Button */}
          {darkMode ? <FaMoon size={20} className='text-gray-500'/> : <FaSun size={20}  className='text-gray-300'/>}
          <ToggleButton isOn={darkMode} handleToggle={handleDarkModeToggle} />
          {/* <button 
            onClick={handleDarkModeToggle} 
            className="px-4 py-2 font-semibold text-white bg-black rounded-lg shadow hover:bg-gray-800"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button> */}

          {/* Display current user name */}
          {currentUser && (
            <h4 className={`flex text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {/* <p className='mr-2 text-gray-500'>Welcome</p> */}
               {currentUser.name}
            </h4>
          )}

          {/* Profile Icon */}
          {currentUser && (
            <div
              ref={profileButtonRef}
              className="relative p-2 rounded-full cursor-pointer"
              onClick={toggleHoverCard}
            >
              <FaUserCircle className={`w-8 h-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />

              {/* Hover Card */}
              {showHoverCard && (
                <div className={`absolute right-0 z-10 w-56 p-4 mt-3 space-y-1 text-left ${darkMode ? 'bg-gray-800' : 'bg-white'} border border-gray-200 rounded-lg shadow-lg`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Name: {currentUser.name}</h4>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email: {currentUser.email}</p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current todos: {userTodos.length}</p>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-2 mt-4 text-sm text-white bg-black rounded hover:bg-gray-800`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

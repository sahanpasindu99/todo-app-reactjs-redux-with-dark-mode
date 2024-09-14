// pages/404.js
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Error = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div
      className={`flex items-center justify-center min-h-[calc(100vh-65px)] px-4 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="text-center">
        <FaExclamationTriangle
          size={40}
          className={`mx-auto sm:text-5xl ${
            darkMode ? 'text-yellow-500' : 'text-red-500'
          }`}
        />
        <h1 className={`mt-4 text-4xl font-bold sm:text-6xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>404</h1>
        <p className={`mt-2 text-lg sm:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <span
            className={`inline-block px-4 py-2 mt-6 text-sm font-semibold rounded-lg sm:px-6 sm:py-3 sm:text-base ${
              darkMode ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Go Back Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Error;

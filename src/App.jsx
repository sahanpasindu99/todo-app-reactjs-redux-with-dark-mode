import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../features/store';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TodoPage from '../pages/TodoPage';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import Error from '../components/Error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <ToastContainer/>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute element={<LoginPage />} redirectTo="/" />}
          />
          <Route
            path="/register"
            element={<ProtectedRoute element={<RegisterPage />} redirectTo="/" />}
          />
          <Route
            path="/todos"
            element={<ProtectedRoute element={<TodoPage />} redirectTo="/todos" />}
          />
           <Route path="*" element={<Error />} /> 
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

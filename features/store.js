import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todoReducer from './todos/todoSlice';
import darkModeReducer from '../features/mode/darkModeSlice'; // Import dark mode reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    darkMode: darkModeReducer, // Add dark mode to store
  },
});

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';

const initialState = {
  users: [], // Array to hold multiple users
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null, // Retrieve current user from local storage
  status: 'idle',
  error: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, name }, { getState, rejectWithValue }) => {
    const { users } = getState().auth;

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return rejectWithValue('Email already registered');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, name, password: hashedPassword };

    // Save the new user to localStorage
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return newUser;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { getState, rejectWithValue }) => {
    const { users } = getState().auth;

    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return rejectWithValue('Invalid credentials');
    }

    // Save current user to localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { getState }) => {
    const { currentUser } = getState().auth;
    return currentUser; // Returning currentUser to update state
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
      toast.success('User logged out')

    },
    loadUsers: (state) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      state.users = users;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload); // Add new user to the list
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload; // Set current user
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.currentUser = action.payload; // Update current user state
      });
  },
});

export const { logout, loadUsers } = authSlice.actions;
export default authSlice.reducer;

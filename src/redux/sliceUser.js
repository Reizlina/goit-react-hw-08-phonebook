import { createSlice } from '@reduxjs/toolkit';
import { register, login, currentUser, logout } from './authOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  user: { name: '', email: '' },
  token: null,
  isLogin: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.pending]: handlePending,
    [register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLogin = true;
    },
    [register.rejected]: handleRejected,

    // *------------------------------

    [login.pending]: handlePending,
    [login.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLogin = true;
    },
    [login.rejected]: handleRejected,

    // *------------------------------

    [currentUser.pending]: handlePending,
    [currentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLogin = true;
    },
    [currentUser.rejected]: handleRejected,

    // *------------------------------

    [logout.pending]: handlePending,
    [logout.fulfilled]() {
      return initialState;
    },
    [logout.rejected]: handleRejected,
  },
});

export const userReducer = authSlice.reducer;

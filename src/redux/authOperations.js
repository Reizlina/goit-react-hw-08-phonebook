import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const tokenAxios = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};

export const register = createAsyncThunk('register', async (user, thunkApi) => {
  try {
    const { data } = await axios.post('/users/signup', user);
    tokenAxios.set(data.token);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
export const currentUser = createAsyncThunk(
  'currentUser',
  async (_, thunkApi) => {
    try {
      tokenAxios.set(thunkApi.getState().token);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk('logout', async (_, thunkApi) => {
  try {
    await axios.post('/users/logout');
    tokenAxios.unset();
    return;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

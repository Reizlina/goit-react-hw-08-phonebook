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
    console.log('register data', data);
    tokenAxios.set(data.token);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk('login', async (user, thunkApi) => {
  try {
    const { data } = await axios.post('/users/login', user);
    tokenAxios.set(data.token);
    console.log('login data', data);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const currentUser = createAsyncThunk(
  'currentUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();

    const token = state.persistedReducer.token;
    // console.log('try get contacts', axios.defaults.headers.common);
    // console.log('token', token);
    if (token === null) {
      return thunkApi.rejectWithValue('Error');
    }
    tokenAxios.set(token);
    try {
      // console.log(
      //   'try get contacts',
      //   axios.defaults.headers.common['Authorization']
      // );
      const { data } = await axios.get('/users/current');

      // console.log('currentUser data', data);
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

// !==============CONTACTS===================

export const getContacts = createAsyncThunk(
  'getContacts',
  async (_, thunkApi) => {
    // console.log('try get contacts', axios.defaults.headers.common);
    try {
      const state = thunkApi.getState();
      const token = state.persistedReducer.token;
      const { data } = await axios.get('/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('data contacts', data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const postContacts = createAsyncThunk(
  'postContacts',
  async (contact, thunkApi) => {
    // console.log('try get contacts', axios.defaults.headers.common);
    try {
      // const state = thunkApi.getState();
      // const token = state.persistedReducer.token;
      const { data } = await axios.post('/contacts', contact);
      console.log('post data', data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'deleteContacts',
  async (id, thunkApi) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// reizlinaReizlina123
// reizlina@mail.ua

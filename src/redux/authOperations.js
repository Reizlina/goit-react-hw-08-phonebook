import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
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
    Notiflix.Notify.failure(
      `Registration error. Try again and check the entered information`,
      {
        position: 'center-center',
        fontSize: '20px',
        failure: {
          background: '#ec7839',
          notiflixIconColor: 'white',
        },
      }
    );
    return thunkApi.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk('login', async (user, thunkApi) => {
  try {
    const { data } = await axios.post('/users/login', user);
    tokenAxios.set(data.token);
    return data;
  } catch (error) {
    Notiflix.Notify.failure(
      `Login error. Try again and check the entered information`,
      {
        position: 'center-center',
        fontSize: '20px',
        failure: {
          background: '#ec7839',
          notiflixIconColor: 'white',
        },
      }
    );
    return thunkApi.rejectWithValue(error.message);
  }
});

export const currentUser = createAsyncThunk(
  'currentUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.persistedReducer.token;
    tokenAxios.set(token);

    try {
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

// !==============CONTACTS===================

export const getContacts = createAsyncThunk(
  'getContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const postContacts = createAsyncThunk(
  'postContacts',
  async (contact, thunkApi) => {
    try {
      const { data } = await axios.post('/contacts', contact);
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

// simpson12345Sim
// simpson123@gmail.com

// Як очистити контакти при виході із облікового запису?

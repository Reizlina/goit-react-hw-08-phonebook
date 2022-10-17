import { createSlice } from '@reduxjs/toolkit';
import {
  getContacts,
  postContacts,
  deleteContacts,
  editContacts,
} from './authOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    find: {
      reducer(state, action) {
        state.filter = action.payload;
      },
    },
  },
  extraReducers: {
    [getContacts.pending]: handlePending,
    [getContacts.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        contacts: [...payload],
      };
    },
    [getContacts.rejected]: handleRejected,

    //   //* ====================

    [postContacts.pending]: handlePending,
    [postContacts.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        contacts: [...state.contacts, payload],
      };
    },
    [postContacts.rejected]: handleRejected,

    //* ====================

    [deleteContacts.pending]: handlePending,
    [deleteContacts.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        contacts: state.contacts.filter(({ id }) => id !== payload),
      };
    },
    [deleteContacts.rejected]: handleRejected,

    //* ====================

    [editContacts.pending]: handlePending,
    [editContacts.fulfilled]: (state, { payload }) => {
      // console.log('payload', payload);
      // const userIndex = state.contacts.findIndex(
      //   contact => contact.id === payload.id
      // );
      // console.log(userIndex);
      return {
        ...state,
        isLoading: false,
        error: null,
        // contacts: [...state, payload],
        contacts: state.contacts.map(contact =>
          contact.id === payload.id ? payload : contact
        ),
      };
    },
    [editContacts.rejected]: handleRejected,
  },
});

export const contactReducer = contactSlice.reducer;

export const { find } = contactSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
// import { fetchContacts, addNewContact, deleteSomeContact } from './operations';
import { getContacts, postContacts, deleteContacts } from './authOperations';

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
        contacts: [...state.contacts, ...payload],
      };
    },
    [getContacts.rejected]: handleRejected,
    //   //* ====================
    [postContacts.pending]: handlePending,
    [postContacts.fulfilled]: (state, { payload }) => {
      console.log(state, payload);
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
  },
});

export const contactReducer = contactSlice.reducer;

export const { find } = contactSlice.actions;

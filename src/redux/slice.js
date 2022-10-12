import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addNewContact, deleteSomeContact } from './operations';

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
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        contacts: [...state.contacts, ...payload],
      };
    },
    [fetchContacts.rejected]: handleRejected,
    //* ====================
    [addNewContact.pending]: handlePending,
    [addNewContact.fulfilled]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: null,
      contacts: [...state.contacts, payload],
    }),
    [addNewContact.rejected]: handleRejected,
    //* ====================
    [deleteSomeContact.pending]: handlePending,
    [deleteSomeContact.fulfilled]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: null,
      contacts: state.contacts.filter(({ id }) => id !== payload.id),
    }),
    [deleteSomeContact.rejected]: handleRejected,
  },
});

export const contactReducer = contactSlice.reducer;

export const { find } = contactSlice.actions;

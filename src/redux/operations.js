// import { createAsyncThunk } from '@reduxjs/toolkit';

// import axios from 'axios';

// export const getContacts = createAsyncThunk(
//   'getContacts',
//   async (_, thunkApi) => {
//     try {
//       const { data } = await axios.get('/contacts');
//       console.log('data contacts', data);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getContacts, addContact, deleteContact } from '../api/apiContacts';

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchContactsStatus',
//   async (_, thunkAPI) => {
//     try {
//       const response = await getContacts();
//       return response;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const addNewContact = createAsyncThunk(
//   'contacts/addContactStatus',
//   async (contactObj, thunkAPI) => {
//     try {
//       const response = await addContact(contactObj);
//       return response;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const deleteSomeContact = createAsyncThunk(
//   'contacts/removeContactStatus',
//   async (id, thunkAPI) => {
//     try {
//       const response = await deleteContact(id);
//       return response;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

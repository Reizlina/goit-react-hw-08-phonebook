import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './sliceUser';
import { contactReducer } from './sliceContacts';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    contactReducer,
  },
  middleware: getDefaultMiddlewares =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
// !_-----------------------
// export const store = configureStore({
//   reducer: contactReducer,
// });

// export default store;

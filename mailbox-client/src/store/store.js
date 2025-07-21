import { configureStore } from '@reduxjs/toolkit';
import mailReducer from './slices/mailSlice'
import getMailReducer from './slices/getMailSlice'

const store = configureStore({
  reducer: {
    mail: mailReducer,
    getMail: getMailReducer,
  },
});

export default store;

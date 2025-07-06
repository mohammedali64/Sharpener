import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  token: localStorage.getItem('token') || '',
  userId: localStorage.getItem('userId') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = '';
      state.userId = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

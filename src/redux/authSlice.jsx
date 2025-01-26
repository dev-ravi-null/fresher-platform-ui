import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    clearCredentials: (state) => {
      state.userId = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

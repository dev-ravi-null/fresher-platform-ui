import { createSlice } from '@reduxjs/toolkit';

const fresherDetailsSlice = createSlice({
  name: 'fresherDetails',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDetailsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    clearFresherDetail: (state, action) => {
      state.data = true;
      state.error = null;
      state.loading = null;
    },
    fetchDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDetailsStart, fetchDetailsSuccess, fetchDetailsFailure, clearFresherDetail } = fresherDetailsSlice.actions;

export default fresherDetailsSlice.reducer;

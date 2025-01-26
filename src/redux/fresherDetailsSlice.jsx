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
    fetchDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDetailsStart, fetchDetailsSuccess, fetchDetailsFailure } = fresherDetailsSlice.actions;

export default fresherDetailsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { orderSuccessOpen: false },
  reducers: {
    openOrderSuccess: (s) => { s.orderSuccessOpen = true; },
    closeOrderSuccess: (s) => { s.orderSuccessOpen = false; },
  },
});

export const { openOrderSuccess, closeOrderSuccess } = uiSlice.actions;
export default uiSlice.reducer;

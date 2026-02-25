import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetProducts } from '../api/client';

export const fetchProductsThunk = createAsyncThunk(
  'products/fetchAll',
  async () => await apiGetProducts()
);

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProductsThunk.pending, (s) => { s.status = 'loading'; s.error = null; });
    b.addCase(fetchProductsThunk.fulfilled, (s, a) => {
      s.status = 'succeeded';
      s.items = Array.isArray(a.payload) ? a.payload : [];
    });
    b.addCase(fetchProductsThunk.rejected, (s, a) => {
      s.status = 'failed';
      s.error = a.error?.message || 'Failed';
    });
  },
});

export default productsSlice.reducer;

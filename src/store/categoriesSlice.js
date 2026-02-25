import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetCategories, apiGetCategoryWithProducts } from '../api/client';

export const fetchCategoriesThunk = createAsyncThunk(
  'categories/fetchAll',
  async () => await apiGetCategories()
);

export const fetchCategoryWithProductsThunk = createAsyncThunk(
  'categories/fetchCategoryWithProducts',
  async (id) => await apiGetCategoryWithProducts(id)
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    current: { status: 'idle', error: null, category: null, products: [] },
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCategoriesThunk.pending, (s) => { s.status = 'loading'; s.error = null; });
    b.addCase(fetchCategoriesThunk.fulfilled, (s, a) => {
      s.status = 'succeeded';
      s.items = Array.isArray(a.payload) ? a.payload : [];
    });
    b.addCase(fetchCategoriesThunk.rejected, (s, a) => {
      s.status = 'failed';
      s.error = a.error?.message || 'Failed';
    });

    b.addCase(fetchCategoryWithProductsThunk.pending, (s) => {
      s.current.status = 'loading';
      s.current.error = null;
      s.current.category = null;
      s.current.products = [];
    });
    b.addCase(fetchCategoryWithProductsThunk.fulfilled, (s, a) => {
      s.current.status = 'succeeded';
      s.current.category = a.payload?.category || null;
      s.current.products = Array.isArray(a.payload?.data) ? a.payload.data : [];
    });
    b.addCase(fetchCategoryWithProductsThunk.rejected, (s, a) => {
      s.current.status = 'failed';
      s.current.error = a.error?.message || 'Failed';
    });
  },
});

export default categoriesSlice.reducer;

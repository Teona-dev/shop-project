import { createSlice } from '@reduxjs/toolkit';

const LS_KEY = 'shop_cart_rtk_v1';

function loadCart() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveCart(items) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(items)); } catch {}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: loadCart() },
  reducers: {
    addToCart: (state, action) => {
      const { product, count = 1 } = action.payload;
      const c = Math.max(1, Number(count) || 1);
      const idx = state.items.findIndex(x => x.id === product.id);
      if (idx >= 0) state.items[idx].count += c;
      else state.items.push({ id: product.id, product, count: c });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(x => x.id !== action.payload);
    },
    setCartCount: (state, action) => {
      const { id, count } = action.payload;
      const c = Math.max(1, Number(count) || 1);
      const item = state.items.find(x => x.id === id);
      if (item) item.count = c;
    },
    clearCart: (state) => { state.items = []; },
  },
});

export const { addToCart, removeFromCart, setCartCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const cartPersistMiddleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  
  if (action.type.startsWith('cart/')) {
    saveCart(storeApi.getState().cart.items);
  }

  return result;
};

const API = import.meta.env.VITE_API_BASE ?? 'http://localhost:3333';

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
  return data;
}

export function imgUrl(path) {
  if (!path) return '';
  return `${API}${path.startsWith('/') ? '' : '/'}${path}`;
}

export async function apiGetProducts() {
  try { return await fetchJson(`${API}/products/all`); }
  catch { return await fetchJson(`${API}/products`); }
}

export async function apiGetProduct(id) {
  const data = await fetchJson(`${API}/products/${id}`);  
  if (Array.isArray(data)) return data[0] ?? { status: 'ERR', message: 'product not found' };
  return data;
}


export async function apiGetCategories() {
  try { return await fetchJson(`${API}/categories/all`); }
  catch { return await fetchJson(`${API}/categories`); }
}

export async function apiGetCategoryWithProducts(id) {
  return await fetchJson(`${API}/categories/${id}`);
}

export async function apiSendOrder(payload) {
  try {
    return await fetchJson(`${API}/order/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return await fetchJson(`${API}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
}

export async function apiSendSale(payload) {
  try {
    return await fetchJson(`${API}/sale/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return await fetchJson(`${API}/sale`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
}

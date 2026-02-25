import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';

import HomePage from './pages/HomePage';
import ElementsPage from './pages/ElementsPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import AllProductsPage from './pages/AllProductsPage';
import AllSalesPage from './pages/AllSalesPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CartEmptyPage from './pages/CartEmptyPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/elements" element={<ElementsPage />} />

        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<CategoryProductsPage />} />

        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/sale" element={<AllSalesPage />} />

        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/empty" element={<CartEmptyPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

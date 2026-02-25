import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategoriesThunk } from '../../store/categoriesSlice';
import CategoryCard from '../../components/CategoryCard';
import s from './CategoriesPage.module.css';

export default function CategoriesPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(st => st.categories);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <div className={s.page}>
      <h1 className={s.title}>Categories</h1>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}

      {status === 'succeeded' && (
        <div className={s.grid}>
          {items.map(c => <CategoryCard key={c.id} category={c} />)}
        </div>
      )}
    </div>
  );
}

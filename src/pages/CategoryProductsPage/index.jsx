import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategoryWithProductsThunk } from '../../store/categoriesSlice';
import FiltersBar from '../../components/FiltersBar';
import ProductCard from '../../components/ProductCard';
import s from './CategoryProductsPage.module.css';

export default function CategoryProductsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const current = useAppSelector(st => st.categories.current);

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sort, setSort] = useState('default');

  useEffect(() => {
    dispatch(fetchCategoryWithProductsThunk(id));
  }, [dispatch, id]);

  const filtered = useMemo(() => {
    let data = [...(current.products || [])];

    if (discountOnly) data = data.filter(p => p.discont_price != null && p.price != null && p.discont_price < p.price);
    if (priceFrom) data = data.filter(p => (p.discont_price ?? p.price) >= Number(priceFrom));
    if (priceTo) data = data.filter(p => (p.discont_price ?? p.price) <= Number(priceTo));

    if (sort === 'price-asc') data.sort((a,b)=>(a.discont_price??a.price)-(b.discont_price??b.price));
    if (sort === 'price-desc') data.sort((a,b)=>(b.discont_price??b.price)-(a.discont_price??a.price));
    if (sort === 'title') data.sort((a,b)=>a.title.localeCompare(b.title));

    return data;
  }, [current.products, discountOnly, priceFrom, priceTo, sort]);

  if (current.status === 'loading') return <p>Loading...</p>;
  if (current.status === 'failed') return <p>{current.error}</p>;

  return (
    <div className={s.page}>
      <h1 className={s.title}>{current.category?.title || 'Category'}</h1>

      <FiltersBar
        priceFrom={priceFrom}
        priceTo={priceTo}
        discountOnly={discountOnly}
        sort={sort}
        onPriceFrom={setPriceFrom}
        onPriceTo={setPriceTo}
        onDiscountOnly={setDiscountOnly}
        onSort={setSort}
        showDiscountToggle={true}
      />

      <div className={s.grid}>
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProductsThunk } from '../../store/productsSlice';
import FiltersBar from '../../components/FiltersBar';
import ProductCard from '../../components/ProductCard';
import s from './AllSalesPage.module.css';

export default function AllSalesPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(st => st.products);

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const sale = useMemo(() => {
    return items.filter(p => p.discont_price != null && p.price != null && p.discont_price < p.price);
  }, [items]);

  const filtered = useMemo(() => {
    let data = [...sale];

    if (priceFrom) data = data.filter(p => (p.discont_price ?? p.price) >= Number(priceFrom));
    if (priceTo) data = data.filter(p => (p.discont_price ?? p.price) <= Number(priceTo));

    if (sort === 'price-asc') data.sort((a,b)=>(a.discont_price??a.price)-(b.discont_price??b.price));
    if (sort === 'price-desc') data.sort((a,b)=>(b.discont_price??b.price)-(a.discont_price??a.price));
    if (sort === 'title') data.sort((a,b)=>a.title.localeCompare(b.title));

    return data;
  }, [sale, priceFrom, priceTo, sort]);

  return (
    <div className={s.page}>
      <h1 className={s.title}>All sales</h1>

      <FiltersBar
        priceFrom={priceFrom}
        priceTo={priceTo}
        discountOnly={false}
        sort={sort}
        onPriceFrom={setPriceFrom}
        onPriceTo={setPriceTo}
        onDiscountOnly={() => {}}
        onSort={setSort}
        showDiscountToggle={false}
      />

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}

      {status === 'succeeded' && (
        <div className={s.grid}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

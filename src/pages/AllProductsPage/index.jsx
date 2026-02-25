import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProductsThunk } from '../../store/productsSlice';
import FiltersBar from '../../components/FiltersBar';
import ProductCard from '../../components/ProductCard';
import s from './AllProductsPage.module.css';

export default function AllProductsPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(st => st.products);

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sort, setSort] = useState('default');
  
  function handleReset() {
    setPriceFrom('');
    setPriceTo('');
    setDiscountOnly(false);
    setSort('default');
  }
 
  function handleApply() {    
  }

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const filtered = useMemo(() => {
    let data = [...items];

    if (discountOnly) data = data.filter(p => p.discont_price != null && p.price != null && p.discont_price < p.price);
    if (priceFrom) data = data.filter(p => (p.discont_price ?? p.price) >= Number(priceFrom));
    if (priceTo) data = data.filter(p => (p.discont_price ?? p.price) <= Number(priceTo));

    if (sort === 'price-asc') data.sort((a,b)=>(a.discont_price??a.price)-(b.discont_price??b.price));
    if (sort === 'price-desc') data.sort((a,b)=>(b.discont_price??b.price)-(a.discont_price??a.price));
    if (sort === 'title') data.sort((a,b)=>a.title.localeCompare(b.title));

    return data;
  }, [items, discountOnly, priceFrom, priceTo, sort]);

  return (
    <div className={s.page}>
      <h1 className={s.title}>All products</h1>

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
        onReset={handleReset} 
        onApply={handleApply}
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
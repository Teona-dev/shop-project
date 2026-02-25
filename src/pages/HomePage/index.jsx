import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategoriesThunk } from '../../store/categoriesSlice';
import { fetchProductsThunk } from '../../store/productsSlice';
import { apiSendSale } from '../../api/client';

import heroImage from '../../assets/images/hero.jpg';
import discountImg from '../../assets/images/discount.png';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import s from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(st => st.categories.items);
  const products = useAppSelector(st => st.products.items);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const saleProducts = useMemo(() => {
    return products.filter(p => p.discont_price != null && p.price != null && p.discont_price < p.price);
  }, [products]);

  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm({
    defaultValues: { name: '', phone: '', email: '' }
  });

  async function onDiscount(data) {
    await apiSendSale(data);
    reset();
    alert('Request sent');
  }

  return (
    <div>
      <section
        className={s.hero}
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.45), rgba(0,0,0,.15)), url(${heroImage})`,
        }}
      >
        <div className={s.heroContent}>
          <h1>Amazing Discounts<br/>on Garden Products!</h1>
          <Link className={s.heroBtn} to="/products">Check out</Link>
          </div>
        </section>

      <section className={s.section}>
        <div className={s.sectionHeader}>
          <h2>Categories</h2>
          <Link to="/categories">All categories</Link>
        </div>
        <div className={s.grid4}>
          {categories.slice(0, 4).map(c => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>

      <section
        className={s.discount}
        style={{ backgroundImage: `url(${discountImg})` }}
      >
        <div className={s.discountInner}>
          <h2>5% off on the first order</h2>

          <form className={s.discountForm} onSubmit={handleSubmit(onDiscount)}>
            <input placeholder="Name" {...register('name')} />

            <input
              placeholder="Phone number"
              {...register('phone', { required: 'Phone is required' })}
            />
            {errors.phone && <div className={s.err}>{errors.phone.message}</div>}

            <input
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <div className={s.err}>{errors.email.message}</div>}

            <button disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Get a discount'}
            </button>
          </form>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.sectionHeader}>
          <h2>Sale</h2>
          <Link to="/sale">All sales</Link>
        </div>
        <div className={s.grid4Products}>
          {saleProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>      
    </div>
  );
}

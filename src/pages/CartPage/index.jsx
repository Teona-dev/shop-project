import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CartItem from '../../components/CartItem';
import OrderSuccessModal from '../../components/OrderSuccessModal';
import CartEmptyPage from '../CartEmptyPage';

import { apiSendOrder } from '../../api/client';
import { clearCart } from '../../store/cartSlice';
import { openOrderSuccess } from '../../store/uiSlice';

import s from './CartPage.module.css';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(st => st.cart.items);
  const successOpen = useAppSelector(st => st.ui.orderSuccessOpen);

  const isEmpty = items.length === 0;

  const countAll = items.reduce((sum, x) => sum + x.count, 0);
  const total = items.reduce(
    (sum, x) => sum + (x.product.discont_price ?? x.product.price ?? 0) * x.count,
    0
  );

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: '', phone: '', email: '' }
  });

  async function onOrder(data) {
    try {
      await apiSendOrder({
        ...data,
        items: items.map(x => ({ id: x.id, count: x.count })),
        total,
      });

      dispatch(openOrderSuccess());
      dispatch(clearCart());
      reset();
    } catch (e) {
      alert(e?.message || 'Order failed');
    }
  }

  if (isEmpty && !successOpen) return <CartEmptyPage />;

  return (
    <div className={s.page}>
      <div className={s.top}>
        <h1 className={s.title}>Shopping cart</h1>
        <div className={s.line} />
        <Link className={s.back} to="/products">Back to the store</Link>
      </div>

      {!isEmpty && (
        <div className={s.layout}>
          <div className={s.list}>
            {items.map(it => <CartItem key={it.id} item={it} />)}
          </div>

          <div className={s.orderBox}>
            <h2>Order details</h2>

            <div className={s.meta}>
              <div className={s.itemsCount}>{countAll} items</div>
              <div className={s.totalRow}>
                <span className={s.totalLabel}>Total</span>
                <span className={s.totalValue}>${total.toFixed(2)}</span>
              </div>
            </div>

            <form className={s.form} onSubmit={handleSubmit(onOrder)}>
              <input
                className={s.input}
                placeholder="Name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <div className={s.err}>{errors.name.message}</div>}

              <input
                className={s.input}
                placeholder="Phone number"
                {...register('phone', { required: 'Phone is required' })}
              />
              {errors.phone && <div className={s.err}>{errors.phone.message}</div>}

              <input
                className={s.input}
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <div className={s.err}>{errors.email.message}</div>}

              <button type="submit" className={s.btn} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Order'}
              </button>
            </form>
          </div>
        </div>
      )}

      {successOpen && <OrderSuccessModal />}
    </div>
  );
}
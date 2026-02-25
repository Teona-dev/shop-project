import { Link } from 'react-router-dom';
import s from './CartEmptyPage.module.css';

export default function CartEmptyPage() {
  return (
    <div className={s.page}>
      <div className={s.top}>
        <h1 className={s.title}>Shopping cart</h1>
        <div className={s.line} />
        <Link className={s.back} to="/products">Back to the store</Link>
      </div>

      <div className={s.empty}>
        <p>Looks like you have no items in your basket currently.</p>
        <Link className={s.continue} to="/products">Continue Shopping</Link>
      </div>
    </div>
  );
}

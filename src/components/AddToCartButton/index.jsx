import s from './AddToCartButton.module.css';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';

export default function AddToCartButton({ product, count = 1, variant = 'green' }) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addToCart({ product, count }));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${s.btn} ${variant === 'black' ? s.black : s.green}`}
    >
      Add to cart
    </button>
  );
}
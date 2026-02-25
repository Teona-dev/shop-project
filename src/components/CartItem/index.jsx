import { imgUrl } from '../../api/client';
import { useAppDispatch } from '../../store/hooks';
import { removeFromCart, setCartCount } from '../../store/cartSlice';
import s from './CartItem.module.css';

export default function CartItem({ item }) {
  const dispatch = useAppDispatch();
  const { id, product, count } = item;

  const price = product.discont_price ?? product.price ?? 0;
  const hasOld = product.discont_price != null && product.price != null && product.discont_price < product.price;

  return (
    <div className={s.item}>
      <img className={s.img} src={imgUrl(product.image)} alt={product.title} />

      <div className={s.body}>
        <div className={s.header}>
          <div className={s.name}>{product.title}</div>
          <button className={s.remove} onClick={()=>dispatch(removeFromCart(id))} aria-label="remove">×</button>
        </div>

        <div className={s.bottom}>
          <div className={s.qty}>
            <button onClick={()=>dispatch(setCartCount({id, count: Math.max(1, count-1)}))}>−</button>
            <span>{count}</span>
            <button onClick={()=>dispatch(setCartCount({id, count: count+1}))}>+</button>
          </div>

          <div className={s.prices}>
            <span className={s.price}>${price}</span>
            {hasOld && <span className={s.old}>${product.price}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

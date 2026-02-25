import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProduct, imgUrl } from '../../api/client';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import s from './ProductPage.module.css';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    apiGetProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;
  if (product.status === 'ERR') return <p>Product not found</p>;

  const price = product.discont_price ?? product.price ?? 0;
  const hasDiscount = product.discont_price != null && product.price != null && product.discont_price < product.price;
  const percent = hasDiscount ? Math.round(100 - (product.discont_price / product.price) * 100) : null;

  return (
    <div className={s.page}>
      <div className={s.image}>
        <img src={imgUrl(product.image)} alt={product.title} />
      </div>

      <div className={s.info}>
        <h1>{product.title}</h1>

        <div className={s.priceBlock}>
          <span className={s.current}>${price}</span>
          {hasDiscount && <span className={s.old}>${product.price}</span>}
          {percent != null && <span className={s.badge}>-{percent}%</span>}
        </div>

        <div className={s.controls}>
          <button onClick={()=>setCount(Math.max(1, count-1))}>−</button>
          <span>{count}</span>
          <button onClick={()=>setCount(count+1)}>+</button>

          <button
            className={s.addBtn}
            onClick={()=>dispatch(addToCart({ product, count }))}
          >
            Add to cart
          </button>
        </div>

        <h3>Description</h3>
        <p className={s.desc}>{product.description}</p>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { imgUrl } from '../../api/client';
import AddToCartButton from '../AddToCartButton';
import s from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const price = product.discont_price ?? product.price ?? 0;
  const hasDiscount =
    product.discont_price != null &&
    product.price != null &&
    product.discont_price < product.price;

  const percent = hasDiscount
    ? Math.round(100 - (product.discont_price / product.price) * 100)
    : null;

  return (
    <div className={s.card}>
      <Link to={`/product/${product.id}`} className={s.imgWrap}>
        <img className={s.img} src={imgUrl(product.image)} alt={product.title} />
        {percent != null && <div className={s.badge}>-{percent}%</div>}
      </Link>

      <div className={s.body}>
        <div className={s.title} title={product.title}>{product.title}</div>

        <div className={s.prices}>
          <span className={s.price}>${price}</span>
          {hasDiscount && <span className={s.old}>${product.price}</span>}
        </div>

        <AddToCartButton
          product={product}
          count={1}
          variant="green"
        />
      </div>
    </div>
  );
}

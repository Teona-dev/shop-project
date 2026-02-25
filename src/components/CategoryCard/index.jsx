import { Link } from 'react-router-dom';
import { imgUrl } from '../../api/client';
import s from './CategoryCard.module.css';

export default function CategoryCard({ category }) {
  return (
    <Link className={s.card} to={`/categories/${category.id}`}>
      <img className={s.img} src={imgUrl(category.image)} alt={category.title} />
      <div className={s.title}>{category.title}</div>
    </Link>
  );
}

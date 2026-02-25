import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={s.page}>
      <h1>Not found</h1>
      <p>Такой страницы нет.</p>
      <Link to="/">На главную</Link>
    </div>
  );
}

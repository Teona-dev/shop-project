import { NavLink, Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

import Logo from '../../assets/icons/Logo';
import Bag from '../../assets/icons/Bag';
import NavPill from '../NavPill';

import s from './Header.module.css';

export default function Header() {
  const count = useAppSelector((st) =>
    st.cart.items.reduce((sum, x) => sum + x.count, 0)
  );

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link className={s.logo} to="/" aria-label="logo">
          <Logo size={44} />
        </Link>

        <nav className={s.nav}>
          <NavLink to="/" className={s.linkPill}>
            {({ isActive }) => (
              <NavPill active={isActive} label="Main Page" />
            )}
          </NavLink>

          <NavLink to="/categories" className={s.linkPill}>
            {({ isActive }) => (
              <NavPill active={isActive} label="All categories" />
            )}
          </NavLink>

          <NavLink to="/products" className={s.linkPill}>
            {({ isActive }) => (
              <NavPill active={isActive} label="All products" />
            )}
          </NavLink>

          <NavLink to="/sale" className={s.linkPill}>
            {({ isActive }) => (
              <NavPill active={isActive} label="All sales" />
            )}
          </NavLink>
        </nav>

        <Link className={s.cart} to="/cart" aria-label="cart">
          <Bag size={28} />
          {count > 0 && <span className={s.badge}>{count}</span>}
        </Link>
      </div>
    </header>
  );
}
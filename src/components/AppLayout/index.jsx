import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import s from './AppLayout.module.css';

export default function AppLayout() {
  return (
    <div className={s.app}>
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

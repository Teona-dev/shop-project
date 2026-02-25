import s from './NavPill.module.css';

export default function NavPill({ active = false, label = '' }) {
  return (
    <div className={`${s.pill} ${active ? s.active : ''}`}>
      {label}
    </div>
  );
}
import s from './BigPill.module.css';

export default function BigPill({ variant = 'green', children }) {
  // variant: "green" | "black" | "white"
  const cls = `${s.pill} ${variant === 'green' ? s.green : ''} ${variant === 'black' ? s.black : ''} ${variant === 'white' ? s.white : ''}`;

  return <div className={cls}>{children}</div>;
}
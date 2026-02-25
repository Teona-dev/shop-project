import s from './FigmaButton.module.css';

export default function FigmaButton({
  children,
  variant = 'light',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${s.btn} ${s[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
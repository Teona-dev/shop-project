import s from './Checkbox.module.css';

export default function Checkbox({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`${s.box} ${checked ? s.checked : ''}`}
      onClick={() => onChange(!checked)}
      role="checkbox"
      aria-checked={checked}
    >
      {checked && (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M20 6L9 17L4 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
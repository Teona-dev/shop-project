import { useEffect, useMemo, useRef, useState } from 'react';
import s from './UiSelect.module.css';

function ChevronDown({ className }) {
  return (
    <svg className={className} width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
      <path d="M11 1L6 6L1 1" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUp({ className }) {
  return (
    <svg className={className} width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
      <path d="M1 7L6 2L11 7" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function UiSelect({
  label = 'Sorted',
  value,
  options,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const current = useMemo(
    () => options.find(o => o.value === value) ?? options[0],
    [options, value]
  );

  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    function onEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <div className={s.wrap} ref={rootRef}>
      <span className={s.label}>{label}</span>

      <button
        type="button"
        className={s.control}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <span className={s.value}>{current?.label}</span>
        {open ? <ChevronUp className={s.chev} /> : <ChevronDown className={s.chev} />}
      </button>

      {open && (
        <div className={s.dropdown} role="listbox">
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                className={`${s.item} ${active ? s.itemActive : ''}`}
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
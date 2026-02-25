import s from './ElementsPage.module.css';

export default function ElementsPage() {
  return (
    <div className={s.wrap}>
      <h1>Elements</h1>
      <div className={s.row}>
        <button className={s.btn}>Primary</button>
        <button className={s.btnGhost}>Ghost</button>
      </div>

      <div className={s.block}>
        <label>Input</label>
        <input className={s.input} placeholder="Type..." />
      </div>
    </div>
  );
}

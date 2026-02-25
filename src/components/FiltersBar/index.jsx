import s from './FiltersBar.module.css';
import Checkbox from '../Checkbox';
import UiSelect from '../UiSelect';
import FigmaButton from '../FigmaButton';

export default function FiltersBar({
  priceFrom,
  priceTo,
  discountOnly,
  sort,
  onPriceFrom,
  onPriceTo,
  onDiscountOnly,
  onSort,
  showDiscountToggle = true,
  onReset,  
}) {
  return (
    <div className={s.filters}>
      <div className={s.group}>
        <span>Price</span>
        <input
          className={s.input}
          placeholder="from"
          value={priceFrom}
          onChange={(e) => onPriceFrom(e.target.value)}
        />
        <input
          className={s.input}
          placeholder="to"
          value={priceTo}
          onChange={(e) => onPriceTo(e.target.value)}
        />
      </div>

      {showDiscountToggle && (
        <div className={`${s.group} ${s.toggle}`}>
          <span>Discounted items</span>
          <Checkbox checked={discountOnly} onChange={onDiscountOnly} />
        </div>
      )}

      <UiSelect
        label="Sorted"
        value={sort}
        onChange={onSort}
        options={[
          { value: 'default', label: 'by default' },
          { value: 'price-asc', label: 'price ↑' },
          { value: 'price-desc', label: 'price ↓' },
          { value: 'title', label: 'title' },
        ]}
      />

      {onReset && (
        <div className={s.actions}>
          <FigmaButton variant="light" onClick={onReset}>
            Reset
          </FigmaButton>
        </div>
      )}
    </div>
  );
}
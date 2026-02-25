import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { closeOrderSuccess } from '../../store/uiSlice';
import s from './OrderSuccessModal.module.css';

export default function OrderSuccessModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleContinue() {
    dispatch(closeOrderSuccess());
    navigate('/products');
  }

  function handleClose() {
    dispatch(closeOrderSuccess());
  }

  return (
    <div className={s.overlay} role="dialog" aria-modal="true">
      <div className={s.modal}>
        <button className={s.close} onClick={handleClose} aria-label="close">
          ×
        </button>

        <h2>Congratulations!</h2>
        <p>Your order has been successfully placed on the website.</p>
        <p>A manager will contact you shortly to confirm your order.</p>

        <button type="button" className={s.continueBtn} onClick={handleContinue}>
          Continue shopping
        </button>
      </div>
    </div>
  );
}
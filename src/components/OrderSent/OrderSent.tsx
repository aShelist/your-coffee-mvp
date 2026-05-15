import { CheckCircle2 } from 'lucide-react';
import styles from './OrderSent.module.css';

type Props = {
  onGoHome: () => void;
};

export function OrderSent({ onGoHome }: Props) {
  return (
    <div className={styles.wrapper}>
      <CheckCircle2 size={130} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />
      <h2 className={styles.title}>Заказ отправлен</h2>
      <button type="button" className={styles.button} onClick={onGoHome}>
        Вернуться на главную
      </button>
    </div>
  );
}

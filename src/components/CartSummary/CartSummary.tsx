import styles from './CartSummary.module.css';

type Props = {
  total: number;
  onSubmit: () => void;
};

export function CartSummary({ total, onSubmit }: Props) {
  return (
    <div className={styles.sheet}>
      <div className={styles.row}>
        <span className={styles.label}>ИТОГО:</span>
        <span className={styles.total}>{total} ₽</span>
      </div>
      <button type="button" className={styles.submit} onClick={onSubmit}>
        Отправить бариста
      </button>
    </div>
  );
}

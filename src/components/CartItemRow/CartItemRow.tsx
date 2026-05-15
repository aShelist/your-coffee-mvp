import { Trash2 } from 'lucide-react';
import type { MenuItem } from '../../data/menuTypes';
import styles from './CartItemRow.module.css';

type Props = {
  item: MenuItem;
  quantity: number;
  onRemove: (id: string) => void;
};

export function CartItemRow({ item, quantity, onRemove }: Props) {
  const lineTotal = item.price * quantity;
  return (
    <article className={styles.card}>
      <img className={styles.image} src={item.image} alt={item.name} />
      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>
        <div className={styles.bottomRow}>
          <span className={styles.quantity}>{quantity} шт</span>
          <span className={styles.price}>{lineTotal} ₽</span>
        </div>
      </div>
      <button
        type="button"
        className={styles.removeButton}
        onClick={() => onRemove(item.id)}
        aria-label={`Удалить ${item.name} из корзины`}
      >
        <Trash2 size={18} aria-hidden="true" />
      </button>
    </article>
  );
}

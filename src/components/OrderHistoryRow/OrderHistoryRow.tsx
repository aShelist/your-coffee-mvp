import type { Order } from '../../data/orderTypes';
import styles from './OrderHistoryRow.module.css';

type Props = { order: Order };

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatItems(order: Order): string {
  return order.items.map((i) => `${i.name} × ${i.quantity}`).join(', ');
}

export function OrderHistoryRow({ order }: Props) {
  return (
    <article className={styles.row}>
      <div className={styles.headerRow}>
        <span className={styles.date}>{formatDate(order.createdAt)}</span>
        <span className={styles.total}>{order.total} ₽</span>
      </div>
      <p className={styles.items}>{formatItems(order)}</p>
      <p className={styles.bonus}>+{order.bonusEarned} бонусов</p>
    </article>
  );
}

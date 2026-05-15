import { Plus } from 'lucide-react';
import type { MenuItem } from '../../data/menuTypes';
import styles from './MenuItemCard.module.css';

type Props = {
  item: MenuItem;
  onAdd: (id: string) => void;
};

export function MenuItemCard({ item, onAdd }: Props) {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={item.image} alt={item.name} />
      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.prices}>
          <span className={styles.price}>{item.price} ₽</span>
          <span className={styles.bonus}>или {item.bonusPrice} Б</span>
        </div>
      </div>
      <button
        type="button"
        className={styles.addButton}
        onClick={() => onAdd(item.id)}
        aria-label={`Добавить ${item.name} в корзину`}
      >
        <Plus size={20} aria-hidden="true" />
      </button>
    </article>
  );
}

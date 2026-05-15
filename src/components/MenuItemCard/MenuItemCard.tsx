import { Plus } from 'lucide-react';
import type { MenuItem } from '../../data/menuTypes';
import styles from './MenuItemCard.module.css';

type Props = {
  item: MenuItem;
  inCartQuantity?: number;
  onAdd: (id: string) => void;
};

export function MenuItemCard({ item, inCartQuantity = 0, onAdd }: Props) {
  const inCart = inCartQuantity > 0;
  return (
    <article className={`${styles.card} ${inCart ? styles.inCart : ''}`.trim()}>
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
        className={`${styles.addButton} ${inCart ? styles.addButtonInCart : ''}`.trim()}
        onClick={() => onAdd(item.id)}
        aria-label={
          inCart
            ? `Добавить ещё ${item.name}, в корзине ${inCartQuantity}`
            : `Добавить ${item.name} в корзину`
        }
      >
        {inCart ? (
          <span className={styles.countLabel}>{inCartQuantity}</span>
        ) : (
          <Plus size={20} aria-hidden="true" />
        )}
      </button>
    </article>
  );
}

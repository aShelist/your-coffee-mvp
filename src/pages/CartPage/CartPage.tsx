import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { CartItemRow } from '../../components/CartItemRow/CartItemRow';
import { CartSummary } from '../../components/CartSummary/CartSummary';
import { OrderSent } from '../../components/OrderSent/OrderSent';
import { useCartStore } from '../../stores/cartStore';
import { useUserStore } from '../../stores/userStore';
import { getById } from '../../data/menuQueries';
import type { MenuItem } from '../../data/menuTypes';
import type { Order, OrderItem } from '../../data/orderTypes';
import styles from './CartPage.module.css';

type DetailedItem = { item: MenuItem; quantity: number };

export function CartPage() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const addOrder = useUserStore((s) => s.addOrder);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const detailed: DetailedItem[] = items
    .map((ci) => {
      const item = getById(ci.menuItemId);
      return item ? { item, quantity: ci.quantity } : null;
    })
    .filter((x): x is DetailedItem => x !== null);

  const total = detailed.reduce((sum, d) => sum + d.item.price * d.quantity, 0);

  const handleSubmit = () => {
    const orderItems: OrderItem[] = detailed.map((d) => ({
      menuItemId: d.item.id,
      name: d.item.name,
      quantity: d.quantity,
      priceAtPurchase: d.item.price,
    }));
    const order: Order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      items: orderItems,
      total,
      bonusEarned: Math.floor(total * 0.1),
    };
    addOrder(order);
    clear();
    setSubmitted(true);
  };

  if (submitted) {
    return <OrderSent onGoHome={() => navigate('/')} />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Корзина</h1>
        <ShoppingBag size={28} strokeWidth={1.8} aria-hidden="true" className={styles.headerIcon} />
      </div>

      {detailed.length === 0 ? (
        <div className={styles.empty}>
          <ShoppingBag size={120} strokeWidth={1.4} className={styles.emptyIcon} aria-hidden="true" />
          <p className={styles.emptyText}>Ваша корзина пуста</p>
          <Link to="/menu" className={styles.emptyButton}>
            Перейти в меню
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {detailed.map((d) => (
              <CartItemRow
                key={d.item.id}
                item={d.item}
                quantity={d.quantity}
                onRemove={remove}
              />
            ))}
          </div>
          <CartSummary total={total} onSubmit={handleSubmit} />
        </>
      )}
    </div>
  );
}

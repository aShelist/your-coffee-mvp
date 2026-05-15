import { NavLink } from 'react-router-dom';
import { Home, Coffee, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import styles from './BottomNav.module.css';

const tabs = [
  { to: '/', label: 'Главная', icon: Home, withBadge: false },
  { to: '/menu', label: 'Меню', icon: Coffee, withBadge: false },
  { to: '/cart', label: 'Корзина', icon: ShoppingCart, withBadge: true },
  { to: '/profile', label: 'Профиль', icon: User, withBadge: false },
] as const;

export function BottomNav() {
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <nav className={styles.nav}>
      {tabs.map(({ to, label, icon: Icon, withBadge }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.active : ''}`.trim()
          }
        >
          <span className={styles.iconWrap}>
            <Icon size={24} aria-hidden="true" />
            {withBadge && cartCount > 0 && (
              <span className={styles.badge} aria-label={`в корзине ${cartCount}`}>
                {cartCount}
              </span>
            )}
          </span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

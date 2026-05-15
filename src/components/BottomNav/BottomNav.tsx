import { NavLink } from 'react-router-dom';
import { Home, Coffee, ShoppingCart, User } from 'lucide-react';
import styles from './BottomNav.module.css';

const tabs = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/menu', label: 'Меню', icon: Coffee },
  { to: '/cart', label: 'Корзина', icon: ShoppingCart },
  { to: '/profile', label: 'Профиль', icon: User },
];

export function BottomNav() {
  return (
    <nav className={styles.nav}>
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.active : ''}`.trim()
          }
        >
          <Icon size={24} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

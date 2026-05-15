import { BonusCard } from '../../components/BonusCard/BonusCard';
import { QuickActions } from '../../components/QuickActions/QuickActions';
import { AdvantagesCard } from '../../components/AdvantagesCard/AdvantagesCard';
import { OrderHistoryRow } from '../../components/OrderHistoryRow/OrderHistoryRow';
import { useUserStore } from '../../stores/userStore';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const bonusBalance = useUserStore((s) => s.bonusBalance);
  const totalSpent = useUserStore((s) => s.totalSpent);
  const orderHistory = useUserStore((s) => s.orderHistory);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Мой профиль</h1>
      <BonusCard bonusBalance={bonusBalance} totalSpent={totalSpent} />

      <div className={styles.spacer} />
      <QuickActions />

      <div className={styles.spacer} />
      <AdvantagesCard />

      <div className={styles.spacer} />
      <h2 className={styles.section}>История заказов</h2>
      {orderHistory.length === 0 ? (
        <p className={styles.empty}>У вас пока нет заказов</p>
      ) : (
        <div className={styles.history}>
          {[...orderHistory].reverse().map((order) => (
            <OrderHistoryRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

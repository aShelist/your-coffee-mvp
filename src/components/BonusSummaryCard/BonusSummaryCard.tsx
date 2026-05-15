import { Star } from 'lucide-react';
import { getLevel } from '../../data/levelRules';
import styles from './BonusSummaryCard.module.css';

type Props = {
  bonusBalance: number;
  totalSpent: number;
};

export function BonusSummaryCard({ bonusBalance, totalSpent }: Props) {
  const level = getLevel(totalSpent);
  return (
    <section className={styles.card} aria-label="Ваши бонусы">
      <div className={styles.iconWrapper}>
        <Star size={40} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />
      </div>
      <div className={styles.column}>
        <span className={styles.label}>Ваши бонусы</span>
        <span className={styles.value}>{bonusBalance} Б</span>
      </div>
      <div className={styles.column}>
        <span className={styles.label}>Уровень</span>
        <span className={styles.levelPill}>{level}</span>
      </div>
    </section>
  );
}

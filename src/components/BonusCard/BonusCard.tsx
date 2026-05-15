import { Coffee } from 'lucide-react';
import { levelProgress } from '../../data/levelRules';
import styles from './BonusCard.module.css';

type Props = {
  bonusBalance: number;
  totalSpent: number;
};

export function BonusCard({ bonusBalance, totalSpent }: Props) {
  const { current, next, toNext, progress } = levelProgress(totalSpent);
  const isMax = next === null;
  return (
    <section className={styles.card} aria-label="Баланс бонусов">
      <div className={styles.topRow}>
        <span className={styles.label}>БАЛАНС БОНУСОВ</span>
        <div className={styles.iconBox}>
          <Coffee size={32} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>
      <p className={styles.balance}>{bonusBalance} Б</p>

      <div className={styles.levelRow}>
        <span>
          Уровень: <span className={styles.levelName}>{current}</span>
        </span>
        {!isMax && <span className={styles.toNext}>до {next}: {toNext} ₽</span>}
      </div>

      <div
        className={styles.progress}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.progressFill} style={{ width: `${Math.min(progress * 100, 100)}%` }} />
      </div>

      <p className={styles.hint}>
        {isMax ? 'Максимальный уровень достигнут' : `Копите бонусы, чтобы открыть уровень «${next}»`}
      </p>
    </section>
  );
}

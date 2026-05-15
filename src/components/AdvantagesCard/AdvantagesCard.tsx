import { Gift, BadgePercent, Star, Sparkles } from 'lucide-react';
import styles from './AdvantagesCard.module.css';

const items = [
  { icon: Gift, label: 'День рождения — напиток в подарок' },
  { icon: BadgePercent, label: 'Персональные скидки и предложения' },
  { icon: Star, label: 'Бонусы за покупки и активности' },
  { icon: Sparkles, label: 'Ранний доступ к новинкам и акциям' },
];

export function AdvantagesCard() {
  return (
    <section className={styles.card} aria-label="Ваши преимущества">
      <h2 className={styles.title}>Ваши преимущества</h2>
      <div className={styles.grid}>
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className={styles.item}>
            <Icon size={28} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

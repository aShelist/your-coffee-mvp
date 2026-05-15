import { User } from 'lucide-react';
import styles from './GreetingCard.module.css';

type Props = { name: string; photoUrl?: string };

export function GreetingCard({ name, photoUrl }: Props) {
  return (
    <section className={styles.card} aria-label="Приветствие">
      <div className={styles.avatar}>
        {photoUrl ? (
          <img src={photoUrl} alt={name} className={styles.avatarImage} />
        ) : (
          <User size={42} strokeWidth={1.5} aria-hidden="true" />
        )}
      </div>
      <div className={styles.text}>
        <h2 className={styles.greeting}>Привет, {name}!</h2>
        <p className={styles.subtitle}>
          Ваш любимый бариста на связи. Нужна подзарядка?
        </p>
      </div>
    </section>
  );
}

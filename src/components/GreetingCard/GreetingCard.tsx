import { useState } from 'react';
import styles from './GreetingCard.module.css';

type Props = { name: string; photoUrl?: string };

export function GreetingCard({ name, photoUrl }: Props) {
  const [imageBroken, setImageBroken] = useState(false);
  const safeName = name?.trim() || 'Гость';
  const initial = safeName.charAt(0).toUpperCase();
  const showImage = Boolean(photoUrl) && !imageBroken;

  return (
    <section className={styles.card} aria-label="Приветствие">
      <div className={styles.avatar}>
        {showImage ? (
          <img
            src={photoUrl}
            alt={safeName}
            className={styles.avatarImage}
            referrerPolicy="no-referrer"
            onError={() => setImageBroken(true)}
          />
        ) : (
          <span className={styles.avatarInitial} aria-hidden="true">{initial}</span>
        )}
      </div>
      <div className={styles.text}>
        <h2 className={styles.greeting}>Привет, {safeName}!</h2>
        <p className={styles.subtitle}>
          Ваш любимый бариста на связи. Нужна подзарядка?
        </p>
      </div>
    </section>
  );
}

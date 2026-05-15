import styles from './GreetingCard.module.css';

type Props = { name: string; photoUrl?: string };

export function GreetingCard({ name, photoUrl }: Props) {
  const initial = name.trim().charAt(0).toUpperCase() || '🙂';
  return (
    <section className={styles.card} aria-label="Приветствие">
      <div className={styles.avatar}>
        {photoUrl ? (
          <img src={photoUrl} alt={name} className={styles.avatarImage} />
        ) : (
          <span className={styles.avatarInitial} aria-hidden="true">{initial}</span>
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

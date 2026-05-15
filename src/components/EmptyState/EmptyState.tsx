import { Hourglass } from 'lucide-react';
import styles from './EmptyState.module.css';

type Props = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <Hourglass size={80} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />
    </div>
  );
}

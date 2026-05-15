import type { ComponentType, SVGProps } from 'react';
import styles from './PromoTile.module.css';

type Props = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  variant: 'accent' | 'beige';
};

export function PromoTile({ icon: Icon, title, subtitle, variant }: Props) {
  return (
    <div className={`${styles.tile} ${styles[variant]}`} aria-disabled="true">
      <Icon className={styles.icon} width={30} height={30} aria-hidden="true" />
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}

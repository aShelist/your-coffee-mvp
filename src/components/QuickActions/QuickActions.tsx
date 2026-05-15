import { QrCode, History, Heart, Gift } from 'lucide-react';
import styles from './QuickActions.module.css';

const actions = [
  { icon: QrCode, label: 'Мой QR\nдля оплаты' },
  { icon: History, label: 'История\nзаказов' },
  { icon: Heart, label: 'Избранное' },
  { icon: Gift, label: 'Подарки и\nсертификаты' },
];

export function QuickActions() {
  return (
    <div className={styles.row}>
      {actions.map(({ icon: Icon, label }) => (
        <div key={label} className={styles.tile} aria-disabled="true">
          <Icon size={28} strokeWidth={1.6} className={styles.icon} aria-hidden="true" />
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
}

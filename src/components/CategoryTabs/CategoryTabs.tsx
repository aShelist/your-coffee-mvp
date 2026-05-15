import { Coffee, IceCream, GlassWater } from 'lucide-react';
import type { Category } from '../../data/menuTypes';
import styles from './CategoryTabs.module.css';

type Props = {
  value: Category;
  onChange: (next: Category) => void;
};

const tabs: { id: Category; label: string; Icon: typeof Coffee }[] = [
  { id: 'coffee', label: 'Кофе', Icon: Coffee },
  { id: 'dessert', label: 'Десерты', Icon: IceCream },
  { id: 'not-coffee', label: 'Не кофе', Icon: GlassWater },
];

export function CategoryTabs({ value, onChange }: Props) {
  return (
    <div role="tablist" className={styles.tabs}>
      {tabs.map(({ id, label, Icon }) => {
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`${styles.tab} ${selected ? styles.active : ''}`.trim()}
            onClick={() => onChange(id)}
          >
            <Icon size={16} aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

import { useState } from 'react';
import { CategoryTabs } from '../../components/CategoryTabs/CategoryTabs';
import { MenuItemCard } from '../../components/MenuItemCard/MenuItemCard';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { getByCategory } from '../../data/menuQueries';
import { useCartStore } from '../../stores/cartStore';
import type { Category } from '../../data/menuTypes';
import styles from './MenuPage.module.css';

const emptyMessages: Record<Category, { title: string; description: string }> = {
  coffee: {
    title: 'Скоро в меню',
    description: 'Мы готовим новые виды кофе. Совсем скоро они появятся в нашей кофейне',
  },
  dessert: {
    title: 'Скоро в меню',
    description: 'Мы готовим новые десерты. Совсем скоро они появятся в нашей кофейне',
  },
  'not-coffee': {
    title: 'Скоро в меню',
    description: 'Мы готовим новые напитки. Совсем скоро они появятся в нашей кофейне',
  },
};

export function MenuPage() {
  const [category, setCategory] = useState<Category>('coffee');
  const items = getByCategory(category);
  const add = useCartStore((s) => s.add);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Меню</h1>
      <CategoryTabs value={category} onChange={setCategory} />
      {items.length === 0 ? (
        <EmptyState
          title={emptyMessages[category].title}
          description={emptyMessages[category].description}
        />
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} onAdd={add} />
          ))}
        </div>
      )}
    </div>
  );
}

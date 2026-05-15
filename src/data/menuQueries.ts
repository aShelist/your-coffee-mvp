import menuData from './menu.json';
import type { Category, MenuItem } from './menuTypes';

const allItems = menuData as MenuItem[];

export function getByCategory(category: Category): MenuItem[] {
  return allItems.filter((item) => item.category === category);
}

export type Level = 'Новичок' | 'Любитель' | 'Кофеман';

export function getLevel(totalSpent: number): Level {
  if (totalSpent < 500) return 'Новичок';
  if (totalSpent < 2000) return 'Любитель';
  return 'Кофеман';
}

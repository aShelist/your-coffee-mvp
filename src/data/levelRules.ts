export type Level = 'Новичок' | 'Любитель' | 'Кофеман';

const THRESHOLDS = { 'Любитель': 500, 'Кофеман': 2000 } as const;

export function getLevel(totalSpent: number): Level {
  if (totalSpent < THRESHOLDS['Любитель']) return 'Новичок';
  if (totalSpent < THRESHOLDS['Кофеман']) return 'Любитель';
  return 'Кофеман';
}

export type LevelProgress = {
  current: Level;
  next: Level | null;
  toNext: number;
  progress: number;
};

export function levelProgress(totalSpent: number): LevelProgress {
  const current = getLevel(totalSpent);
  if (current === 'Новичок') {
    return {
      current,
      next: 'Любитель',
      toNext: THRESHOLDS['Любитель'] - totalSpent,
      progress: totalSpent / THRESHOLDS['Любитель'],
    };
  }
  if (current === 'Любитель') {
    const band = THRESHOLDS['Кофеман'] - THRESHOLDS['Любитель'];
    return {
      current,
      next: 'Кофеман',
      toNext: THRESHOLDS['Кофеман'] - totalSpent,
      progress: (totalSpent - THRESHOLDS['Любитель']) / band,
    };
  }
  return { current: 'Кофеман', next: null, toNext: 0, progress: 1 };
}

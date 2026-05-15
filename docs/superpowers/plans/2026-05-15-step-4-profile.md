# Step 4 — Profile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** `/profile` показывает «Мой профиль», карточку баланса с прогрессом до следующего уровня, статичные декор-блоки (4 квик-плитки + преимущества) и историю заказов из `userStore`.

**Scope reductions vs Figma:** 4 квик-плитки и «преимущества» рендерятся как чисто декоративные, без обработчиков. QR-генерация, избранное, подарки — вне MVP.

---

## File Map

**Создаём:**
- `src/data/levelRules.ts` — добавить `levelProgress(totalSpent)` → `{ current, next, progress, toNext }`
- расширить `src/data/levelRules.test.ts`
- `src/components/BonusCard/BonusCard.tsx` + `.module.css` + `.test.tsx`
- `src/components/OrderHistoryRow/OrderHistoryRow.tsx` + `.module.css` + `.test.tsx`
- `src/components/QuickActions/QuickActions.tsx` + `.module.css` (декор, без теста)
- `src/components/AdvantagesCard/AdvantagesCard.tsx` + `.module.css` (декор, без теста)
- `src/pages/ProfilePage/ProfilePage.module.css`, `ProfilePage.test.tsx`

**Модифицируем:**
- `src/pages/ProfilePage/ProfilePage.tsx` — полная реализация

---

## Task 1 — levelRules: levelProgress

Дополнить функцию, возвращающую данные о текущем/следующем уровне.

`src/data/levelRules.ts`:

```typescript
export type Level = 'Новичок' | 'Любитель' | 'Кофеман';

const THRESHOLDS = { 'Любитель': 500, 'Кофеман': 2000 } as const;

export function getLevel(totalSpent: number): Level {
  if (totalSpent < THRESHOLDS['Любитель']) return 'Новичок';
  if (totalSpent < THRESHOLDS['Кофеман']) return 'Любитель';
  return 'Кофеман';
}

export type LevelProgress = {
  current: Level;
  next: Level | null;       // null if at max
  toNext: number;           // ₽ remaining to next level (0 if max)
  progress: number;         // 0..1, fraction of current band filled
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
```

Расширить `src/data/levelRules.test.ts` — добавить блок:

```typescript
import { getLevel, levelProgress } from './levelRules';
// ...
describe('levelProgress', () => {
  it('returns Новичок with progress to Любитель at 0', () => {
    const p = levelProgress(0);
    expect(p.current).toBe('Новичок');
    expect(p.next).toBe('Любитель');
    expect(p.toNext).toBe(500);
    expect(p.progress).toBe(0);
  });

  it('returns half progress at 250', () => {
    const p = levelProgress(250);
    expect(p.progress).toBe(0.5);
  });

  it('returns Любитель starting at 500', () => {
    const p = levelProgress(500);
    expect(p.current).toBe('Любитель');
    expect(p.next).toBe('Кофеман');
    expect(p.toNext).toBe(1500);
    expect(p.progress).toBe(0);
  });

  it('returns Кофеман with null next at 2000+', () => {
    const p = levelProgress(2000);
    expect(p.current).toBe('Кофеман');
    expect(p.next).toBeNull();
    expect(p.toNext).toBe(0);
    expect(p.progress).toBe(1);
  });
});
```

---

## Task 2 — BonusCard component

Большая градиентная карточка с балансом, уровнем, прогрессом.

`src/components/BonusCard/BonusCard.tsx`:

```tsx
import { Coffee } from 'lucide-react';
import { levelProgress } from '../../data/levelRules';
import styles from './BonusCard.module.css';

type Props = {
  bonusBalance: number;
  totalSpent: number;
};

export function BonusCard({ bonusBalance, totalSpent }: Props) {
  const { current, next, toNext, progress } = levelProgress(totalSpent);
  const isMax = next === null;
  return (
    <section className={styles.card} aria-label="Баланс бонусов">
      <div className={styles.topRow}>
        <span className={styles.label}>БАЛАНС БОНУСОВ</span>
        <div className={styles.iconBox}>
          <Coffee size={32} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>
      <p className={styles.balance}>{bonusBalance} Б</p>

      <div className={styles.levelRow}>
        <span>
          Уровень: <span className={styles.levelName}>{current}</span>
        </span>
        {!isMax && <span className={styles.toNext}>до {next}: {toNext} ₽</span>}
      </div>

      <div className={styles.progress} role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.progressFill} style={{ width: `${Math.min(progress * 100, 100)}%` }} />
      </div>

      <p className={styles.hint}>
        {isMax ? 'Максимальный уровень достигнут' : `Копите бонусы, чтобы открыть уровень «${next}»`}
      </p>
    </section>
  );
}
```

`src/components/BonusCard/BonusCard.module.css`:

```css
.card {
  background: linear-gradient(180deg, #503727 0%, #b67e58 100%);
  color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.topRow {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.label {
  font-size: 13px;
  letter-spacing: 0.04em;
  opacity: 0.7;
}

.iconBox {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
}

.balance {
  font-size: 42px;
  font-weight: 700;
  margin: 12px 0 28px;
}

.levelRow {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 14px;
  margin-bottom: 8px;
}

.levelName {
  color: var(--highlight);
  font-weight: 600;
}

.toNext {
  opacity: 0.7;
}

.progress {
  height: 8px;
  width: 100%;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 14px;
}

.progressFill {
  height: 100%;
  background: linear-gradient(90deg, #e25c08 0%, #ffc300 100%);
  border-radius: 4px;
  transition: width 200ms ease;
}

.hint {
  font-size: 13px;
  opacity: 0.7;
  text-align: center;
}
```

`src/components/BonusCard/BonusCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { BonusCard } from './BonusCard';

describe('BonusCard', () => {
  it('shows current balance in Б', () => {
    render(<BonusCard bonusBalance={120} totalSpent={300} />);
    expect(screen.getByText('120 Б')).toBeInTheDocument();
  });

  it('shows current level and progress to next', () => {
    render(<BonusCard bonusBalance={0} totalSpent={250} />);
    expect(screen.getByText(/Новичок/)).toBeInTheDocument();
    expect(screen.getByText(/до Любитель: 250 ₽/)).toBeInTheDocument();
  });

  it('shows max-level state when totalSpent is high', () => {
    render(<BonusCard bonusBalance={500} totalSpent={3000} />);
    expect(screen.getByText(/Кофеман/)).toBeInTheDocument();
    expect(screen.getByText('Максимальный уровень достигнут')).toBeInTheDocument();
  });

  it('progress bar reflects progress value', () => {
    render(<BonusCard bonusBalance={0} totalSpent={250} />);
    const pb = screen.getByRole('progressbar');
    expect(pb).toHaveAttribute('aria-valuenow', '50');
  });
});
```

---

## Task 3 — OrderHistoryRow component

Одна строка в списке истории. Дата, состав, сумма, бонусы.

`src/components/OrderHistoryRow/OrderHistoryRow.tsx`:

```tsx
import type { Order } from '../../data/orderTypes';
import styles from './OrderHistoryRow.module.css';

type Props = { order: Order };

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatItems(order: Order): string {
  return order.items.map((i) => `${i.name} × ${i.quantity}`).join(', ');
}

export function OrderHistoryRow({ order }: Props) {
  return (
    <article className={styles.row}>
      <div className={styles.headerRow}>
        <span className={styles.date}>{formatDate(order.createdAt)}</span>
        <span className={styles.total}>{order.total} ₽</span>
      </div>
      <p className={styles.items}>{formatItems(order)}</p>
      <p className={styles.bonus}>+{order.bonusEarned} бонусов</p>
    </article>
  );
}
```

`src/components/OrderHistoryRow/OrderHistoryRow.module.css`:

```css
.row {
  background: var(--surface);
  border-radius: 15px;
  padding: 14px 16px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
}

.headerRow {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
}

.date {
  font-size: 13px;
  color: var(--text-muted);
}

.total {
  font-size: 18px;
  font-weight: 700;
}

.items {
  font-size: 14px;
  color: var(--text);
  margin-bottom: 4px;
}

.bonus {
  font-size: 13px;
  color: var(--highlight);
  font-weight: 600;
}
```

`src/components/OrderHistoryRow/OrderHistoryRow.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { OrderHistoryRow } from './OrderHistoryRow';
import type { Order } from '../../data/orderTypes';

const order: Order = {
  id: 'o-1',
  createdAt: '2026-05-15T12:30:00Z',
  items: [
    { menuItemId: 'latte', name: 'Латте', quantity: 2, priceAtPurchase: 280 },
    { menuItemId: 'cappuccino', name: 'Капучино', quantity: 1, priceAtPurchase: 250 },
  ],
  total: 810,
  bonusEarned: 81,
};

describe('OrderHistoryRow', () => {
  it('renders total, item list and bonus earned', () => {
    render(<OrderHistoryRow order={order} />);
    expect(screen.getByText('810 ₽')).toBeInTheDocument();
    expect(screen.getByText('Латте × 2, Капучино × 1')).toBeInTheDocument();
    expect(screen.getByText('+81 бонусов')).toBeInTheDocument();
  });
});
```

---

## Task 4 — QuickActions + AdvantagesCard (декор)

`src/components/QuickActions/QuickActions.tsx`:

```tsx
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
```

`src/components/QuickActions/QuickActions.module.css`:

```css
.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.tile {
  background: var(--surface);
  border-radius: 15px;
  padding: 10px 6px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 90px;
  opacity: 0.85;
}

.icon {
  color: var(--text);
  margin-bottom: 6px;
}

.label {
  font-size: 11px;
  line-height: 1.2;
  white-space: pre-line;
}
```

`src/components/AdvantagesCard/AdvantagesCard.tsx`:

```tsx
import { Gift, BadgePercent, Star, Sparkles } from 'lucide-react';
import styles from './AdvantagesCard.module.css';

const items = [
  { icon: Gift, label: 'День рождения — напиток в подарок' },
  { icon: BadgePercent, label: 'Персональные скидки и предложения' },
  { icon: Star, label: 'Бонусы за покупки и активности' },
  { icon: Sparkles, label: 'Ранний доступ к новинкам и акциям' },
];

export function AdvantagesCard() {
  return (
    <section className={styles.card} aria-label="Ваши преимущества">
      <h2 className={styles.title}>Ваши преимущества</h2>
      <div className={styles.grid}>
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className={styles.item}>
            <Icon size={28} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

`src/components/AdvantagesCard/AdvantagesCard.module.css`:

```css
.card {
  background: var(--surface);
  border-radius: 15px;
  padding: 14px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 12px;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.item {
  background: var(--surface-light-beige);
  border-radius: 15px;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 80px;
  font-size: 13px;
  line-height: 1.3;
  color: var(--text-muted);
}

.icon {
  flex-shrink: 0;
  color: var(--text);
  opacity: 0.6;
}
```

---

## Task 5 — ProfilePage

`src/pages/ProfilePage/ProfilePage.tsx`:

```tsx
import { BonusCard } from '../../components/BonusCard/BonusCard';
import { QuickActions } from '../../components/QuickActions/QuickActions';
import { AdvantagesCard } from '../../components/AdvantagesCard/AdvantagesCard';
import { OrderHistoryRow } from '../../components/OrderHistoryRow/OrderHistoryRow';
import { useUserStore } from '../../stores/userStore';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const bonusBalance = useUserStore((s) => s.bonusBalance);
  const totalSpent = useUserStore((s) => s.totalSpent);
  const orderHistory = useUserStore((s) => s.orderHistory);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Мой профиль</h1>
      <BonusCard bonusBalance={bonusBalance} totalSpent={totalSpent} />

      <div className={styles.spacer} />
      <QuickActions />

      <div className={styles.spacer} />
      <AdvantagesCard />

      <div className={styles.spacer} />
      <h2 className={styles.section}>История заказов</h2>
      {orderHistory.length === 0 ? (
        <p className={styles.empty}>У вас пока нет заказов</p>
      ) : (
        <div className={styles.history}>
          {[...orderHistory].reverse().map((order) => (
            <OrderHistoryRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
```

`src/pages/ProfilePage/ProfilePage.module.css`:

```css
.page {
  padding-top: 4px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
}

.spacer {
  height: 16px;
}

.section {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
}

.history {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty {
  color: var(--text-muted);
  font-size: 14px;
  padding: 16px 0;
  text-align: center;
}
```

`src/pages/ProfilePage/ProfilePage.test.tsx`:

```tsx
import { beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProfilePage } from './ProfilePage';
import { useUserStore } from '../../stores/userStore';
import type { Order } from '../../data/orderTypes';

const order1: Order = {
  id: 'o-1',
  createdAt: '2026-05-14T10:00:00Z',
  items: [{ menuItemId: 'latte', name: 'Латте', quantity: 1, priceAtPurchase: 280 }],
  total: 280,
  bonusEarned: 28,
};
const order2: Order = {
  id: 'o-2',
  createdAt: '2026-05-15T12:00:00Z',
  items: [{ menuItemId: 'cappuccino', name: 'Капучино', quantity: 2, priceAtPurchase: 250 }],
  total: 500,
  bonusEarned: 50,
};

describe('ProfilePage', () => {
  beforeEach(() => {
    useUserStore.setState({ bonusBalance: 0, totalSpent: 0, orderHistory: [] });
    localStorage.clear();
  });

  it('shows empty history message when no orders', () => {
    render(<MemoryRouter><ProfilePage /></MemoryRouter>);
    expect(screen.getByText('У вас пока нет заказов')).toBeInTheDocument();
  });

  it('shows balance and history when orders exist', () => {
    useUserStore.setState({
      bonusBalance: 78,
      totalSpent: 780,
      orderHistory: [order1, order2],
    });
    render(<MemoryRouter><ProfilePage /></MemoryRouter>);
    expect(screen.getByText('78 Б')).toBeInTheDocument();
    expect(screen.getByText(/Уровень:/)).toBeInTheDocument();
    expect(screen.getByText(/Любитель/)).toBeInTheDocument();
    // Both orders rendered
    expect(screen.getByText(/Латте × 1/)).toBeInTheDocument();
    expect(screen.getByText(/Капучино × 2/)).toBeInTheDocument();
  });
});
```

---

## Task 6 — Финальная проверка

```bash
pnpm test
pnpm run build
```

Expected: 43 (Steps 1-3) + levelRules 4 new + BonusCard 4 + OrderHistoryRow 1 + ProfilePage 2 = **54 passed**.

Локально открой `/profile` — пока история пуста (если ты не делал заказы в DevTools, баланс 0). Можешь сделать заказ через `/cart` (накидай товаров в `/menu`, оформи) и вернись на `/profile` — заказ появится в истории, баланс обновится, может смениться уровень.

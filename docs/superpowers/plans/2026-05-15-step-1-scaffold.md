# Step 1 — Scaffold + Framework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Готовый каркас Telegram Mini App с роутингом, нижней навигацией, Telegram SDK-обвязкой и палитрой из Figma, развёрнутый на Vercel и привязанный к боту в Telegram. Все 5 экранов существуют как заглушки.

**Architecture:** Vite + React + TS, frontend-only SPA. Telegram WebApp подключается напрямую через `window.Telegram.WebApp` (без дополнительных оберток — стабильнее и проще). React Router в `BrowserRouter`-режиме, SPA-fallback через `vercel.json`. Тесты на Vitest + React Testing Library. Без zustand/данных каталога на этом шаге — добавим в шагах 2-4.

**Tech Stack:** Vite 5, React 18, TypeScript 5, react-router-dom 6, lucide-react (иконки), Vitest + RTL, Vercel.

**Working directory:** `/Users/aishelist/Work/miniApp` (уже содержит `docs/`, `.claude/`, `.idea/` — создаём проект рядом с ними).

---

## File Map

**Создаём:**
- `.gitignore`
- `package.json`
- `vite.config.ts`
- `tsconfig.json`, `tsconfig.node.json`
- `index.html`
- `vercel.json`
- `README.md`
- `src/main.tsx` — entry point
- `src/App.tsx` — корневой компонент с роутингом
- `src/App.module.css`
- `src/vite-env.d.ts` — типы Vite + Telegram WebApp
- `src/styles/theme.css` — CSS-переменные палитры
- `src/styles/global.css` — сброс + базовые стили
- `src/test/setup.ts` — конфиг Vitest
- `src/lib/telegram.ts` — обёртка над Telegram WebApp
- `src/lib/telegram.test.ts`
- `src/components/BottomNav/BottomNav.tsx`
- `src/components/BottomNav/BottomNav.module.css`
- `src/components/BottomNav/BottomNav.test.tsx`
- `src/pages/HomePage/HomePage.tsx`
- `src/pages/MenuPage/MenuPage.tsx`
- `src/pages/ProductPage/ProductPage.tsx`
- `src/pages/CartPage/CartPage.tsx`
- `src/pages/ProfilePage/ProfilePage.tsx`

**Структура каждой страницы (одинаковая):** один файл `<Name>Page.tsx` с экспортом одноимённой функции, без CSS — на Шаге 5 каждая обзаведётся своими стилями.

---

## Task 1 — Init git + .gitignore

**Files:**
- Create: `.gitignore`

- [ ] **Step 1.1: Инициализировать git-репозиторий**

```bash
cd /Users/aishelist/Work/miniApp
git init
```

Expected: `Initialized empty Git repository in /Users/aishelist/Work/miniApp/.git/`

- [ ] **Step 1.2: Создать `.gitignore`**

Файл `/Users/aishelist/Work/miniApp/.gitignore`:

```
node_modules
dist
dist-ssr
*.local
.env*
.DS_Store
*.log
.idea
.vscode
.vercel
coverage
```

- [ ] **Step 1.3: Initial commit с тем, что уже есть**

```bash
git add .gitignore docs/
git commit -m "chore: initial commit with presentation and design specs"
```

Expected: коммит создан, `git status` показывает clean working tree (с учётом игнора `.idea`, `.claude`).

---

## Task 2 — package.json + установка зависимостей

**Files:**
- Create: `package.json`

- [ ] **Step 2.1: Создать `package.json`**

Файл `/Users/aishelist/Work/miniApp/package.json`:

```json
{
  "name": "your-coffee-mvp",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "lucide-react": "^0.400.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "jsdom": "^24.1.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 2.2: Установить зависимости**

```bash
cd /Users/aishelist/Work/miniApp && npm install
```

Expected: появилась папка `node_modules/`, `package-lock.json`, без ошибок установки.

- [ ] **Step 2.3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add package.json and install dependencies"
```

---

## Task 3 — TypeScript + Vite конфиги + index.html

**Files:**
- Create: `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/vite-env.d.ts`

- [ ] **Step 3.1: `tsconfig.json`**

Файл `/Users/aishelist/Work/miniApp/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3.2: `tsconfig.node.json`**

Файл `/Users/aishelist/Work/miniApp/tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 3.3: `vite.config.ts`**

Файл `/Users/aishelist/Work/miniApp/vite.config.ts`:

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

- [ ] **Step 3.4: `index.html`**

Файл `/Users/aishelist/Work/miniApp/index.html`:

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>YourCoffee AI</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3.5: `src/vite-env.d.ts`** (типы окружения + Telegram WebApp)

Файл `/Users/aishelist/Work/miniApp/src/vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />

interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
}

interface TelegramWebApp {
  ready(): void;
  expand(): void;
  close(): void;
  initDataUnsafe: {
    user?: TelegramWebAppUser;
  };
  themeParams: Record<string, string>;
  colorScheme: 'light' | 'dark';
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}
```

- [ ] **Step 3.6: Commit**

```bash
git add tsconfig.json tsconfig.node.json vite.config.ts index.html src/vite-env.d.ts
git commit -m "chore: add TypeScript and Vite configuration"
```

---

## Task 4 — Test setup + первый смок-тест

**Files:**
- Create: `src/test/setup.ts`, `src/main.tsx`, `src/App.tsx`, `src/App.module.css`, `src/App.test.tsx`

- [ ] **Step 4.1: `src/test/setup.ts`**

Файл `/Users/aishelist/Work/miniApp/src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 4.2: Написать падающий смок-тест для App**

Файл `/Users/aishelist/Work/miniApp/src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
```

- [ ] **Step 4.3: Запустить тест — должен упасть (нет App)**

```bash
npx vitest run src/App.test.tsx
```

Expected: FAIL — `Cannot find module './App'` или похожее.

- [ ] **Step 4.4: Минимальный `src/App.tsx` чтобы прошёл**

Файл `/Users/aishelist/Work/miniApp/src/App.tsx`:

```tsx
export function App() {
  return (
    <main>
      <h1>YourCoffee AI</h1>
    </main>
  );
}
```

- [ ] **Step 4.5: Запустить тест — должен пройти**

```bash
npx vitest run src/App.test.tsx
```

Expected: 1 passed.

- [ ] **Step 4.6: `src/main.tsx`** (entry point)

Файл `/Users/aishelist/Work/miniApp/src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 4.7: Проверить, что dev-сервер стартует**

```bash
cd /Users/aishelist/Work/miniApp && npm run dev
```

Expected: вывод `VITE v5.x ready in Xms`, ссылка `http://localhost:5173/`. Открой в браузере — увидишь «YourCoffee AI». Останови сервер (Ctrl+C).

- [ ] **Step 4.8: Commit**

```bash
git add src/test/setup.ts src/App.tsx src/App.test.tsx src/main.tsx
git commit -m "feat: minimal React app with vitest smoke test"
```

---

## Task 5 — Дизайн-токены и глобальные стили

**Files:**
- Create: `src/styles/theme.css`, `src/styles/global.css`

- [ ] **Step 5.1: `src/styles/theme.css`** (CSS-переменные из спеки)

Файл `/Users/aishelist/Work/miniApp/src/styles/theme.css`:

```css
:root {
  --bg: #fff7e3;
  --surface: #ffffff;
  --surface-beige: #f6efeb;
  --surface-light-beige: #f5e6d8;
  --accent: #ff9149;
  --accent-pressed: #ff8936;
  --highlight: #fab005;
  --ai-card: #8f6341;
  --text: #000000;
  --text-muted: rgba(0, 0, 0, 0.65);
  --text-on-accent: #ffffff;
  --radius-card: 20px;
  --radius-button: 10px;
  --shadow-card: 0 4px 4px rgba(0, 0, 0, 0.25);
  --bottom-nav-height: 64px;
}
```

- [ ] **Step 5.2: `src/styles/global.css`** (сброс + базовый layout)

Файл `/Users/aishelist/Work/miniApp/src/styles/global.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100vh;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  cursor: pointer;
  border: none;
  background: none;
}
```

- [ ] **Step 5.3: Подключить стили в `main.tsx`**

Изменить файл `src/main.tsx`, добавив импорты стилей перед `ReactDOM`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/theme.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 5.4: Прогнать тесты — ничего не сломалось**

```bash
npm test
```

Expected: 1 passed.

- [ ] **Step 5.5: Commit**

```bash
git add src/styles/ src/main.tsx
git commit -m "feat: add design tokens and global styles from Figma palette"
```

---

## Task 6 — Заглушки 5 экранов

**Files:**
- Create: `src/pages/HomePage/HomePage.tsx`, `src/pages/MenuPage/MenuPage.tsx`, `src/pages/ProductPage/ProductPage.tsx`, `src/pages/CartPage/CartPage.tsx`, `src/pages/ProfilePage/ProfilePage.tsx`

- [ ] **Step 6.1: `HomePage.tsx`**

Файл `/Users/aishelist/Work/miniApp/src/pages/HomePage/HomePage.tsx`:

```tsx
export function HomePage() {
  return <h2>Главная</h2>;
}
```

- [ ] **Step 6.2: `MenuPage.tsx`**

Файл `/Users/aishelist/Work/miniApp/src/pages/MenuPage/MenuPage.tsx`:

```tsx
export function MenuPage() {
  return <h2>Меню</h2>;
}
```

- [ ] **Step 6.3: `ProductPage.tsx`**

Файл `/Users/aishelist/Work/miniApp/src/pages/ProductPage/ProductPage.tsx`:

```tsx
import { useParams } from 'react-router-dom';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  return <h2>Товар {id}</h2>;
}
```

- [ ] **Step 6.4: `CartPage.tsx`**

Файл `/Users/aishelist/Work/miniApp/src/pages/CartPage/CartPage.tsx`:

```tsx
export function CartPage() {
  return <h2>Корзина</h2>;
}
```

- [ ] **Step 6.5: `ProfilePage.tsx`**

Файл `/Users/aishelist/Work/miniApp/src/pages/ProfilePage/ProfilePage.tsx`:

```tsx
export function ProfilePage() {
  return <h2>Профиль</h2>;
}
```

- [ ] **Step 6.6: Commit**

```bash
git add src/pages/
git commit -m "feat: add stub pages for home, menu, product, cart, profile"
```

---

## Task 7 — Роутинг (App с Routes + тест навигации)

**Files:**
- Modify: `src/App.tsx`, `src/App.test.tsx`
- Create: `src/App.module.css`

- [ ] **Step 7.1: Расширить `App.test.tsx`** — тест на маршрут `/menu`

Заменить содержимое файла `/Users/aishelist/Work/miniApp/src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

describe('App routing', () => {
  it('renders HomePage at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Главная' })).toBeInTheDocument();
  });

  it('renders MenuPage at /menu', () => {
    render(
      <MemoryRouter initialEntries={['/menu']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Меню' })).toBeInTheDocument();
  });

  it('renders ProductPage with id at /menu/:id', () => {
    render(
      <MemoryRouter initialEntries={['/menu/latte-1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Товар latte-1' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 7.2: Запустить — должны упасть (App не имеет роутов)**

```bash
npx vitest run src/App.test.tsx
```

Expected: 3 failed (нет нужных заголовков).

- [ ] **Step 7.3: Реализовать роутинг в `App.tsx`**

Заменить содержимое файла `/Users/aishelist/Work/miniApp/src/App.tsx`:

```tsx
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { MenuPage } from './pages/MenuPage/MenuPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { CartPage } from './pages/CartPage/CartPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}
```

- [ ] **Step 7.4: `App.module.css`**

Файл `/Users/aishelist/Work/miniApp/src/App.module.css`:

```css
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: var(--bottom-nav-height);
}

.main {
  flex: 1;
  padding: 16px;
}
```

- [ ] **Step 7.5: Запустить — должны пройти**

```bash
npx vitest run src/App.test.tsx
```

Expected: 3 passed.

- [ ] **Step 7.6: Commit**

```bash
git add src/App.tsx src/App.test.tsx src/App.module.css
git commit -m "feat: add react-router routing for 5 pages"
```

---

## Task 8 — BottomNav с активной вкладкой

**Files:**
- Create: `src/components/BottomNav/BottomNav.tsx`, `src/components/BottomNav/BottomNav.module.css`, `src/components/BottomNav/BottomNav.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 8.1: Написать падающий тест BottomNav**

Файл `/Users/aishelist/Work/miniApp/src/components/BottomNav/BottomNav.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BottomNav } from './BottomNav';

describe('BottomNav', () => {
  it('renders four tabs', () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>
    );
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Меню')).toBeInTheDocument();
    expect(screen.getByText('Корзина')).toBeInTheDocument();
    expect(screen.getByText('Профиль')).toBeInTheDocument();
  });

  it('marks the tab matching current route as active', () => {
    render(
      <MemoryRouter initialEntries={['/menu']}>
        <BottomNav />
      </MemoryRouter>
    );
    const menuLink = screen.getByText('Меню').closest('a');
    expect(menuLink?.className).toMatch(/active/);
  });

  it('does not mark a non-current tab as active', () => {
    render(
      <MemoryRouter initialEntries={['/menu']}>
        <BottomNav />
      </MemoryRouter>
    );
    const homeLink = screen.getByText('Главная').closest('a');
    expect(homeLink?.className).not.toMatch(/active/);
  });
});
```

- [ ] **Step 8.2: Запустить — должны упасть (нет компонента)**

```bash
npx vitest run src/components/BottomNav/
```

Expected: FAIL — `Cannot find module './BottomNav'`.

- [ ] **Step 8.3: Реализовать `BottomNav.tsx`**

Файл `/Users/aishelist/Work/miniApp/src/components/BottomNav/BottomNav.tsx`:

```tsx
import { NavLink } from 'react-router-dom';
import { Home, Coffee, ShoppingCart, User } from 'lucide-react';
import styles from './BottomNav.module.css';

const tabs = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/menu', label: 'Меню', icon: Coffee },
  { to: '/cart', label: 'Корзина', icon: ShoppingCart },
  { to: '/profile', label: 'Профиль', icon: User },
];

export function BottomNav() {
  return (
    <nav className={styles.nav}>
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.active : ''}`.trim()
          }
        >
          <Icon size={24} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
```

- [ ] **Step 8.4: Стили `BottomNav.module.css`**

Файл `/Users/aishelist/Work/miniApp/src/components/BottomNav/BottomNav.module.css`:

```css
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: var(--surface);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  height: var(--bottom-nav-height);
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
}

.tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: var(--text-muted);
  font-size: 11px;
}

.active {
  color: var(--highlight);
}
```

- [ ] **Step 8.5: Запустить — должны пройти**

```bash
npx vitest run src/components/BottomNav/
```

Expected: 3 passed.

- [ ] **Step 8.6: Встроить BottomNav в `App.tsx`**

Заменить содержимое файла `/Users/aishelist/Work/miniApp/src/App.tsx`:

```tsx
import { Routes, Route } from 'react-router-dom';
import { BottomNav } from './components/BottomNav/BottomNav';
import { HomePage } from './pages/HomePage/HomePage';
import { MenuPage } from './pages/MenuPage/MenuPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { CartPage } from './pages/CartPage/CartPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
```

- [ ] **Step 8.7: Прогнать все тесты — всё зелёное**

```bash
npm test
```

Expected: 6 passed (App: 3, BottomNav: 3). Изначальный смок-тест из Task 4.2 был заменён на 3 routing-теста в Task 7.1.

- [ ] **Step 8.8: Commit**

```bash
git add src/components/BottomNav/ src/App.tsx
git commit -m "feat: add bottom navigation with active tab highlighting"
```

---

## Task 9 — Telegram WebApp adapter

**Files:**
- Create: `src/lib/telegram.ts`, `src/lib/telegram.test.ts`
- Modify: `src/main.tsx`, `src/pages/HomePage/HomePage.tsx`

- [ ] **Step 9.1: Написать падающий тест адаптера**

Файл `/Users/aishelist/Work/miniApp/src/lib/telegram.test.ts`:

```typescript
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getUser, initTelegram } from './telegram';

describe('telegram.getUser', () => {
  beforeEach(() => {
    // ensure clean global
    delete (window as { Telegram?: unknown }).Telegram;
  });

  afterEach(() => {
    delete (window as { Telegram?: unknown }).Telegram;
  });

  it('returns the mock user when Telegram WebApp is not available', () => {
    const u = getUser();
    expect(u.firstName).toBe('Алексей');
    expect(u.id).toBe(0);
  });

  it('returns the user from Telegram WebApp when present', () => {
    (window as unknown as { Telegram: { WebApp: unknown } }).Telegram = {
      WebApp: {
        ready: () => {},
        expand: () => {},
        close: () => {},
        themeParams: {},
        colorScheme: 'light',
        initDataUnsafe: {
          user: {
            id: 42,
            first_name: 'Павел',
            username: 'pavel',
            photo_url: 'https://example.com/p.jpg',
          },
        },
      },
    };

    const u = getUser();
    expect(u.id).toBe(42);
    expect(u.firstName).toBe('Павел');
    expect(u.username).toBe('pavel');
    expect(u.photoUrl).toBe('https://example.com/p.jpg');
  });
});

describe('telegram.initTelegram', () => {
  beforeEach(() => {
    delete (window as { Telegram?: unknown }).Telegram;
  });

  it('is a no-op when Telegram WebApp is not available', () => {
    expect(() => initTelegram()).not.toThrow();
  });

  it('calls ready() and expand() when Telegram WebApp is present', () => {
    let readyCalled = false;
    let expandCalled = false;
    (window as unknown as { Telegram: { WebApp: unknown } }).Telegram = {
      WebApp: {
        ready: () => { readyCalled = true; },
        expand: () => { expandCalled = true; },
        close: () => {},
        themeParams: {},
        colorScheme: 'light',
        initDataUnsafe: {},
      },
    };

    initTelegram();
    expect(readyCalled).toBe(true);
    expect(expandCalled).toBe(true);
  });
});
```

- [ ] **Step 9.2: Запустить — должны упасть (нет модуля)**

```bash
npx vitest run src/lib/
```

Expected: FAIL — `Cannot find module './telegram'`.

- [ ] **Step 9.3: Реализовать `src/lib/telegram.ts`**

Файл `/Users/aishelist/Work/miniApp/src/lib/telegram.ts`:

```typescript
export type TgUser = {
  id: number;
  firstName: string;
  username?: string;
  photoUrl?: string;
};

const MOCK_USER: TgUser = {
  id: 0,
  firstName: 'Алексей',
};

export function initTelegram(): void {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  tg.ready();
  tg.expand();
}

export function getUser(): TgUser {
  const u = window.Telegram?.WebApp?.initDataUnsafe?.user;
  if (!u) return MOCK_USER;
  return {
    id: u.id,
    firstName: u.first_name,
    username: u.username,
    photoUrl: u.photo_url,
  };
}
```

- [ ] **Step 9.4: Запустить — должны пройти**

```bash
npx vitest run src/lib/
```

Expected: 4 passed.

- [ ] **Step 9.5: Подключить `initTelegram()` в `main.tsx`**

Заменить содержимое файла `/Users/aishelist/Work/miniApp/src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { initTelegram } from './lib/telegram';
import './styles/theme.css';
import './styles/global.css';

initTelegram();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 9.6: Использовать `getUser()` на главной для дымовой проверки**

Заменить содержимое файла `/Users/aishelist/Work/miniApp/src/pages/HomePage/HomePage.tsx`:

```tsx
import { getUser } from '../../lib/telegram';

export function HomePage() {
  const user = getUser();
  return <h2>Главная — привет, {user.firstName}!</h2>;
}
```

- [ ] **Step 9.7: Обновить App-тест под новый заголовок главной**

Заменить первый тест в `/Users/aishelist/Work/miniApp/src/App.test.tsx`:

Найти:
```tsx
  it('renders HomePage at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Главная' })).toBeInTheDocument();
  });
```

Заменить на:
```tsx
  it('renders HomePage at / with greeting', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading')).toHaveTextContent(/Главная.*Алексей/);
  });
```

- [ ] **Step 9.8: Прогнать все тесты**

```bash
npm test
```

Expected: всё зелёное (App: 3, BottomNav: 3, Telegram: 4).

- [ ] **Step 9.9: Проверить локально**

```bash
cd /Users/aishelist/Work/miniApp && npm run dev
```

Открой `http://localhost:5173/`. Должен быть текст «Главная — привет, Алексей!» и нижняя навигация. Понажимай вкладки — переключение между заглушками работает, активная вкладка подсвечена жёлтым. Останови сервер.

- [ ] **Step 9.10: Commit**

```bash
git add src/lib/ src/main.tsx src/pages/HomePage/HomePage.tsx src/App.test.tsx
git commit -m "feat: add Telegram WebApp adapter with mock user fallback"
```

---

## Task 10 — Vercel deploy

**Files:**
- Create: `vercel.json`, `README.md`

- [ ] **Step 10.1: `vercel.json`** (SPA-fallback для роутера)

Файл `/Users/aishelist/Work/miniApp/vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

- [ ] **Step 10.2: Базовый `README.md`**

Файл `/Users/aishelist/Work/miniApp/README.md`:

```markdown
# YourCoffee AI — Telegram Mini App

Курсовой проект: Telegram Mini App для кофейни с системой лояльности.

## Запуск локально

```bash
npm install
npm run dev
```

Откроется `http://localhost:5173/`. В обычном браузере используется мок-пользователь «Алексей».

## Тесты

```bash
npm test
```

## Деплой

Привязан к Vercel — каждый push в `main` автоматически деплоится.

URL мини-аппы: см. Vercel Dashboard.

## Бот

Бот создан через `@BotFather`, в нём настроена кнопка меню, открывающая мини-аппу.
```

- [ ] **Step 10.3: Проверить production-сборку локально**

```bash
cd /Users/aishelist/Work/miniApp && npm run build
```

Expected: появилась папка `dist/`, без ошибок TS/Vite.

```bash
cd /Users/aishelist/Work/miniApp && npm run preview
```

Открой `http://localhost:4173/` — то же приложение, но из собранных файлов. Останови.

- [ ] **Step 10.4: Commit**

```bash
git add vercel.json README.md
git commit -m "chore: add Vercel SPA config and README"
```

- [ ] **Step 10.5: 🟡 USER ACTION — создать GitHub-репозиторий и запушить**

Это шаг для пользователя (нужны его права на GitHub):

1. Создай новый репозиторий на github.com (пустой, без README/gitignore).
2. Привяжи локально и запушь:

```bash
cd /Users/aishelist/Work/miniApp
git remote add origin git@github.com:<твой-username>/your-coffee-mvp.git
git branch -M main
git push -u origin main
```

- [ ] **Step 10.6: 🟡 USER ACTION — подключить Vercel**

1. Зайди на vercel.com (логин через GitHub).
2. New Project → импортируй свой репозиторий.
3. Vercel сам определит Vite — фреймворк-пресет «Vite», build command `npm run build`, output dir `dist`. Соглашайся с дефолтами.
4. Deploy.
5. Получишь публичный URL вида `https://your-coffee-mvp.vercel.app`.

Открой URL в обычном браузере — должна загрузиться приложение с заголовком «Главная — привет, Алексей!». Проверь, что навигация по вкладкам работает (если `/menu` отдаёт 404, проблема с `vercel.json` — но мы его уже добавили, должно работать).

---

## Task 11 — Привязка бота через @BotFather

Это user action — Telegram-API нельзя автоматизировать без отдельного бота.

- [ ] **Step 11.1: Создать бота**

В Telegram открой `@BotFather`, отправь команды:

```
/newbot
```

Дальше следуй промптам: имя бота (например, «YourCoffee Demo»), username (например, `your_coffee_demo_bot`).

Сохрани полученный токен (на случай если позже понадобится — для MVP не нужен).

- [ ] **Step 11.2: Привязать Mini App URL**

```
/newapp
```

`@BotFather` спросит:
- Выбери бота — твой свежий бот.
- Title — `YourCoffee AI`.
- Short description — `Telegram Mini App кофейни`.
- Photo — любая картинка 640x360 (можешь экспортировать из Figma или загрузить заглушку).
- GIF/Video — пропусти (`/empty`).
- Web App URL — `https://<твой-проект>.vercel.app`.
- Short name — `app` (или любой).

- [ ] **Step 11.3: Настроить кнопку меню**

```
/setmenubutton
```

- Выбери бота.
- Введи URL мини-аппы (`https://<твой-проект>.vercel.app`).
- Текст кнопки — `Открыть`.

- [ ] **Step 11.4: Проверить в реальном Telegram**

1. В Telegram найди своего бота по username.
2. Нажми `/start`.
3. Нажми кнопку «Открыть» (внизу в области меню).
4. Должна загрузиться мини-аппа на полный экран.
5. Заголовок должен быть «Главная — привет, <твоё-имя-в-Telegram>!» (не «Алексей» — это твоё реальное имя из Telegram).
6. Понажимай вкладки — переключение должно работать, активная подсвечена жёлтым.

Если имя «Алексей» (мок) — значит `window.Telegram.WebApp.initDataUnsafe.user` не подцепился. Проверь, что в `index.html` есть `<script src="https://telegram.org/js/telegram-web-app.js"></script>`.

- [ ] **Step 11.5: Зафиксировать ссылку бота в README**

Добавь в `README.md` секцию с твоей ссылкой на бота:

```markdown
## Demo

Бот: [@your_coffee_demo_bot](https://t.me/your_coffee_demo_bot)
```

Замени `@your_coffee_demo_bot` на реальный username.

- [ ] **Step 11.6: Commit + push**

```bash
git add README.md
git commit -m "docs: add bot link to README"
git push
```

После пуша Vercel автоматически перевыкатит проект (даже если изменился только README).

---

## Definition of Done для Шага 1

- ✅ `npm test` — все тесты зелёные (10 штук: App×3, BottomNav×3, Telegram×4).
- ✅ `npm run build` — собирается без ошибок.
- ✅ Vercel-URL открывается, показывает приложение, навигация работает.
- ✅ Бот в Telegram открывает мини-аппу кнопкой меню.
- ✅ В Telegram заголовок главной показывает реальное имя пользователя.
- ✅ В коде нет TODO/заглушек логики — экраны намеренно пустые, это OK для шага 1.
- ✅ Все коммиты в `main`, история линейная.

После этого можно идти на **Шаг 2 — Меню и карточка товара** (отдельный план).

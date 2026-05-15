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

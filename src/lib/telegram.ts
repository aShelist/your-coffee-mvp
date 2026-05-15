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

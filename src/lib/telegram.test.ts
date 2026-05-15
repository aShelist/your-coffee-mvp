import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getUser, initTelegram } from './telegram';

describe('telegram.getUser', () => {
  beforeEach(() => {
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

import { getUser } from '../../lib/telegram';

export function HomePage() {
  const user = getUser();
  return <h2>Главная — привет, {user.firstName}!</h2>;
}

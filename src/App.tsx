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

import { Sparkles, Sun, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './AIRecommendationCard.module.css';

type Props = {
  weather: string;
  recommendation: string;
  upsell?: string;
};

export function AIRecommendationCard({ weather, recommendation, upsell }: Props) {
  const navigate = useNavigate();
  return (
    <section className={styles.card} aria-label="ИИ-рекомендация">
      <div className={styles.pills}>
        <span className={styles.pill}>
          <Sparkles size={14} aria-hidden="true" /> ИИ Рекомендует
        </span>
        <span className={styles.pill}>
          <Sun size={14} aria-hidden="true" /> {weather}
        </span>
      </div>
      <p className={styles.recommendation}>{recommendation}</p>
      {upsell && <p className={styles.upsell}>{upsell}</p>}
      <button type="button" className={styles.cta} onClick={() => navigate('/menu')}>
        Заказать <ArrowRight size={18} aria-hidden="true" />
      </button>
    </section>
  );
}

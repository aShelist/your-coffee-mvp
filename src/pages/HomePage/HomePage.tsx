import { Gift, Target } from 'lucide-react';
import { GreetingCard } from '../../components/GreetingCard/GreetingCard';
import { AIRecommendationCard } from '../../components/AIRecommendationCard/AIRecommendationCard';
import { PromoTile } from '../../components/PromoTile/PromoTile';
import { BonusSummaryCard } from '../../components/BonusSummaryCard/BonusSummaryCard';
import { getUser } from '../../lib/telegram';
import { useUserStore } from '../../stores/userStore';
import styles from './HomePage.module.css';

const WEATHER = '+22°C, Солнечно';
const RECOMMENDATION = 'Ваш любимый Раф с лавандой сегодня особенно хорош ☕';
const UPSELL = 'Возьмите к нему сырный десерт за 50 бонусов вместо 70!';

export function HomePage() {
  const user = getUser();
  const bonusBalance = useUserStore((s) => s.bonusBalance);
  const totalSpent = useUserStore((s) => s.totalSpent);

  return (
    <div className={styles.page}>
      <GreetingCard name={user.firstName} photoUrl={user.photoUrl} />

      <div className={styles.spacer} />
      <AIRecommendationCard
        weather={WEATHER}
        recommendation={RECOMMENDATION}
        upsell={UPSELL}
      />

      <div className={styles.spacer} />
      <div className={styles.tiles}>
        <PromoTile
          icon={Gift}
          title="Бонус-рулетка"
          subtitle="Крути и выигрывай!"
          variant="accent"
        />
        <PromoTile
          icon={Target}
          title="Вызов дня"
          subtitle="+30 бонусов за капучино"
          variant="beige"
        />
      </div>

      <div className={styles.spacer} />
      <BonusSummaryCard bonusBalance={bonusBalance} totalSpent={totalSpent} />
    </div>
  );
}

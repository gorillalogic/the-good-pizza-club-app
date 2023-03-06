import { Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { fetchPromotions } from '../../core/store/slices/promotions/asyncThunks';
import { promotionsSelector } from '../../core/store/slices/promotions/selectors';
import Hero from '../../shared/components/Hero/Hero';
import PromotionCard from '../../shared/components/PromotionCard/PromotionCard';
import styles from './Home.module.scss';

const info =
  'Promotion valid only for pickup and express purchases, not valid with other coupons. Promotion valid only on Fridays.';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const promotions = useSelector(promotionsSelector);
  const [loadingPromotions, setLoadingPromotions] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPromotions = async () => {
      setLoadingPromotions(true);

      try {
        await dispatch(fetchPromotions()).unwrap();
      } catch (error) {
        setError(true);
      } finally {
        setLoadingPromotions(false);
      }
    };

    getPromotions();
  }, []);

  return (
    <section className={styles.home}>
      <Hero image="images/home_background.png">
        <h1 className={styles.title}>Pizza?</h1>
        <h2 className={styles.subtitle}>Gotcha!</h2>
        <Button className={styles.button} variant="contained" color="error">
          Customize Your Own
        </Button>
      </Hero>
      {loadingPromotions && (
        <section className={styles['home-section']}>
          <CircularProgress color="primary" />
        </section>
      )}
      {!loadingPromotions && (
        <>
          <section className={styles['home-section']}>
            <h3>Promotions of the day</h3>
            {promotions.length > 0 &&
              promotions.map((promotion, index) => (
                <PromotionCard
                  key={promotion.id}
                  promotion={promotion}
                  info={info}
                  contentPosition={index % 2 === 0 ? 'right' : 'left'}
                ></PromotionCard>
              ))}
          </section>
          <section className={styles['home-section']}>
            <h3>You can also try one of our greatest hits</h3>
          </section>
        </>
      )}
      {error && (
        <section className={styles['home-section']}>
          <p className={styles.error}>Error loading data...</p>
        </section>
      )}
      <section className={styles['home-section']}></section>
    </section>
  );
};

export default Home;

import { Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { fetchProducts } from '../../core/store/slices/products/asynchThunks';
import { productsSelector } from '../../core/store/slices/products/selectors';
import { fetchPromotions } from '../../core/store/slices/promotions/asyncThunks';
import { promotionsSelector } from '../../core/store/slices/promotions/selectors';
import Carousel from '../../shared/components/Carousel/Carousel';
import Hero from '../../shared/components/Hero/Hero';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import PromotionCard from '../../shared/components/PromotionCard/PromotionCard';
import { PROMOTION_DISCLAIMER } from '../../shared/constants/global.constants';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(productsSelector);
  const promotions = useSelector(promotionsSelector);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const slices = products.map((product, index) => (
    <ProductCard key={index} product={product} />
  ));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        await Promise.all([
          dispatch(fetchPromotions()).unwrap(),
          dispatch(fetchProducts()).unwrap(),
        ]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      {loading && (
        <section className={styles['home-section']}>
          <CircularProgress color="primary" />
        </section>
      )}
      {!loading && (
        <>
          <section className={styles['home-section']}>
            <h3>Promotions of the day</h3>
            {promotions.length > 0 &&
              promotions.map((promotion, index) => (
                <PromotionCard
                  key={promotion.id}
                  promotion={promotion}
                  info={PROMOTION_DISCLAIMER}
                  contentPosition={index % 2 === 0 ? 'right' : 'left'}
                ></PromotionCard>
              ))}
          </section>
          <section className={styles['home-section']}>
            <h3>You can also try one of our greatest hits</h3>
            <Carousel slides={slices} />
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

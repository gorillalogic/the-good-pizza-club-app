import { Button, CircularProgress } from '@mui/material';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useThunkDispatch } from '../../core/hooks/useThunkDispatch';
import { fetchProducts } from '../../core/store/slices/products/asynchThunks';
import { productsSelector } from '../../core/store/slices/products/selectors';
import { fetchPromotions } from '../../core/store/slices/promotions/asyncThunks';
import { promotionsSelector } from '../../core/store/slices/promotions/selectors';
import Carousel from '../../shared/components/Carousel/Carousel';
import CustomizeDialog from '../../shared/components/CustomizeDialog/CustomizeDialog';
import GoToMenu from '../../shared/components/GoToMenu/GoToMenu';
import Hero from '../../shared/components/Hero/Hero';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import PromotionCard from '../../shared/components/PromotionCard/PromotionCard';
import { PROMOTION_DISCLAIMER } from '../../shared/constants/global.constants';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const products = useSelector(productsSelector);
  const promotions = useSelector(promotionsSelector);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, error } = useThunkDispatch([
    fetchProducts(),
    fetchPromotions(),
  ]);

  const slices = products.map((product, index) => (
    <ProductCard key={index} product={product} />
  ));

  const openCustomizeDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const closeCustomizeDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const addToCart = useCallback(() => {
    // Todo: handle add to cart data
  }, []);

  return (
    <>
      <section className={styles.home}>
        <Hero image="images/home_background.png">
          <h1 className={styles.title}>Pizza?</h1>
          <h2 className={styles.subtitle}>Gotcha!</h2>
          <Button
            className={styles.button}
            variant="contained"
            color="error"
            onClick={openCustomizeDialog}
          >
            Customize Your Own
          </Button>
        </Hero>
        {error && (
          <section className={styles.section}>
            <p className={styles.error}>Error loading data...</p>
          </section>
        )}
        {loading && (
          <section className={styles.section}>
            <CircularProgress color="primary" />
          </section>
        )}
        {!loading && !error && (
          <>
            <section className={styles.section}>
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
            <section className={styles.section}>
              <h3>You can also try one of our greatest hits</h3>
              <Carousel slides={slices} />
            </section>
          </>
        )}
        <section className={styles.section}>
          <GoToMenu />
        </section>
      </section>
      <CustomizeDialog
        open={dialogOpen}
        onClose={closeCustomizeDialog}
        onConfirm={addToCart}
      />
    </>
  );
};

export default Home;

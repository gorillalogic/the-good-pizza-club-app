import { Button, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import CustomizeDialogCtx from '../../core/context/customizeDialogCtx';
import { useThunkDispatch } from '../../core/hooks/useThunkDispatch';
import { fetchProducts } from '../../core/store/slices/products/asynchThunks';
import { productsSelector } from '../../core/store/slices/products/selectors';
import { fetchPromotions } from '../../core/store/slices/promotions/asyncThunks';
import { promotionsSelector } from '../../core/store/slices/promotions/selectors';
import Carousel from '../../shared/components/Carousel/Carousel';
import GoToMenu from '../../shared/components/GoToMenu/GoToMenu';
import Hero from '../../shared/components/Hero/Hero';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import PromotionCard from '../../shared/components/PromotionCard/PromotionCard';
import { PROMOTION_DISCLAIMER } from '../../shared/constants/global.constants';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const products = useSelector(productsSelector);
  const promotions = useSelector(promotionsSelector);
  const customizeDialogCtx = useContext(CustomizeDialogCtx);

  const { loading, error } = useThunkDispatch([
    fetchProducts(),
    fetchPromotions(),
  ]);

  const slices = products.map((product, index) => (
    <ProductCard key={index} product={product} />
  ));

  return (
    <>
      <section className="page">
        <Hero image="images/home_background.png">
          <h1>Pizza?</h1>
          <h2>Gotcha!</h2>
          <Button
            className="page__button"
            variant="contained"
            color="error"
            onClick={customizeDialogCtx.openDialog}
          >
            Customize Your Own
          </Button>
        </Hero>
        {error && (
          <section className="page-section">
            <p className="page__error">Error loading data...</p>
          </section>
        )}
        {loading && (
          <section className="page-section">
            <CircularProgress color="primary" />
          </section>
        )}
        {!loading && !error && (
          <>
            <section className="page-section">
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
            <section className="page-section">
              <h3>You can also try one of our greatest hits</h3>
              <Carousel slides={slices} />
            </section>
          </>
        )}
        <section className="page-section page-section--green">
          <GoToMenu />
        </section>
      </section>
    </>
  );
};

export default Home;

import { Button, CircularProgress } from '@mui/material';
import { useCallback, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import CustomizeDialogCtx from '../../core/context/customizeDialogCtx';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { useThunkDispatch } from '../../core/hooks/useThunkDispatch';
import { addProduct } from '../../core/store/slices/cart';
import { fetchProducts } from '../../core/store/slices/products/asynchThunks';
import { productsSelector } from '../../core/store/slices/products/selectors';
import { fetchPromotions } from '../../core/store/slices/promotions/asyncThunks';
import { promotionsSelector } from '../../core/store/slices/promotions/selectors';
import { showSnackbar } from '../../core/store/slices/snackbar';
import { CartItem } from '../../models/Cart';
import { Product } from '../../models/Product';
import { Promotion } from '../../models/Promotion';
import Carousel from '../../shared/components/Carousel/Carousel';
import GoToMenu from '../../shared/components/GoToMenu/GoToMenu';
import Hero from '../../shared/components/Hero/Hero';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import PromotionCard from '../../shared/components/PromotionCard/PromotionCard';
import { PROMOTION_DISCLAIMER } from '../../shared/constants/global.constants';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const sectionRef = useRef<HTMLDivElement>(null);
  const products = useSelector(productsSelector);
  const promotions = useSelector(promotionsSelector);
  const customizeDialogCtx = useContext(CustomizeDialogCtx);

  const { loading, error } = useThunkDispatch([
    fetchProducts(),
    fetchPromotions(),
  ]);

  const addProductHandler = useCallback((product: Product) => {
    customizeDialogCtx.openDialog({ sizesOnly: true, product });
  }, []);

  const addPromotionHandler = useCallback((promotion: Promotion) => {
    const cartItem: CartItem = {
      id: Date.now(),
      size: promotion.size,
      quantity: 1,
      product: promotion.product,
      promotion,
    };

    dispatch(addProduct(cartItem));
    dispatch(
      showSnackbar({ color: 'success', message: 'Promotion added to cart!' })
    );
  }, []);

  const slices = products.map((product, index) => (
    <ProductCard key={index} product={product} onClick={addProductHandler} />
  ));

  return (
    <>
      <section className="page">
        <Hero image="images/home_background.png" refToScroll={sectionRef}>
          <h1>Pizza?</h1>
          <h2>Gotcha!</h2>
          <Button
            className="page__button"
            variant="contained"
            color="error"
            onClick={() => customizeDialogCtx.openDialog()}
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
            <section className="page-section" ref={sectionRef}>
              <h3>Promotions of the day</h3>
              {promotions.length > 0 &&
                promotions.map((promotion, index) => (
                  <PromotionCard
                    key={promotion.id}
                    promotion={promotion}
                    info={PROMOTION_DISCLAIMER}
                    contentPosition={index % 2 === 0 ? 'right' : 'left'}
                    onClick={addPromotionHandler}
                  />
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

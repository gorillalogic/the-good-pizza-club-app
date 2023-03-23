import { Button } from '@mui/material';
import { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import CustomizeDialogCtx from '../../core/context/customizeDialogCtx';
import { productsSelector } from '../../core/store/slices/products/selectors';
import { promotionsSelector } from '../../core/store/slices/promotions/selectors';
import { Product } from '../../models/Product';
import { Promotion } from '../../models/Promotion';
import Hero from '../../shared/components/Hero/Hero';
import Newsletter from '../../shared/components/Newsletter/Newsletter';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import PromotionCard from '../../shared/components/PromotionCard/PromotionCard';
import { PROMOTION_DISCLAIMER } from '../../shared/constants/global.constants';
import styles from './Menu.module.scss';

const Menu: React.FC = () => {
  const customizeDialogCtx = useContext(CustomizeDialogCtx);
  const products = useSelector(productsSelector);
  const promotions = useSelector(promotionsSelector);

  const productAddHandler = useCallback((product: Product) => {
    customizeDialogCtx.openDialog({ sizesOnly: true, product });
  }, []);

  const promotionAddHandler = useCallback((promotion: Promotion) => {
    //
  }, []);

  return (
    <section className={`page ${styles.menu}`}>
      <Hero image="images/menu_background.png">
        <h1>OUR MOST BELOVED MENU</h1>
      </Hero>
      <section className="page-section">
        <h3>Our repertoire</h3>
        <div className={styles.products}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={productAddHandler}
            />
          ))}
        </div>
        <span className={styles.title}>None of the above?</span>
        <Button
          className={`page__button ${styles.button}`}
          variant="contained"
          color="error"
          onClick={() => customizeDialogCtx.openDialog()}
        >
          Customize Your Own
        </Button>
      </section>
      <section className={`page-section page-section--green ${styles.section}`}>
        <h3>Or try one of our daily promotions!</h3>
        <div className={styles.promotions}>
          {promotions.map((promotion, index) => (
            <PromotionCard
              key={promotion.id}
              promotion={promotion}
              info={PROMOTION_DISCLAIMER}
              contentPosition={index % 2 === 0 ? 'right' : 'left'}
              compact
              onClick={promotionAddHandler}
            />
          ))}
        </div>
        <Newsletter />
      </section>
    </section>
  );
};

export default Menu;
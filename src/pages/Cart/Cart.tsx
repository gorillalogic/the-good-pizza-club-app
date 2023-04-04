import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import useScrollToRef from '../../core/hooks/useScrollToRef';
import cartSelectors from '../../core/store/slices/cart/selectors';
import Hero from '../../shared/components/Hero/Hero';
import Newsletter from '../../shared/components/Newsletter/Newsletter';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isOrderPlaced = useSelector(cartSelectors.placed);
  const { scrollTo } = useScrollToRef();

  useEffect(() => {
    if (isOrderPlaced && ref) {
      scrollTo(ref);
    }
  }, [isOrderPlaced, ref]);

  return (
    <section className={`page ${styles.cart}`}>
      <Hero image="images/cart_background.png" refToScroll={ref}>
        <h1>WE’RE FAST!</h1>
        <h2>Well, sorta.</h2>
      </Hero>
      <section className="page-section" ref={ref}>
        <Outlet />
      </section>
      <section className={`page-section ${styles.section}`}>
        <Newsletter className={styles.newsletter} />
      </section>
    </section>
  );
};

export default Cart;

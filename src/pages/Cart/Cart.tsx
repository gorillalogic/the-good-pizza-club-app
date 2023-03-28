import { useCallback, useState } from 'react';
import CartSummary from '../../shared/components/CartSummary/CartSummary';
import CartTabs from '../../shared/components/CartTabs/CartTabs';
import Hero from '../../shared/components/Hero/Hero';
import Newsletter from '../../shared/components/Newsletter/Newsletter';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabChangeHandler = useCallback((value: number) => {
    setSelectedTab(value);
  }, []);

  const nextClickHandler = useCallback(() => {
    setSelectedTab(selectedTab + 1);
  }, [selectedTab]);

  return (
    <section className={`page ${styles.cart}`}>
      <Hero image="images/cart_background.png">
        <h1>WE’RE FAST!</h1>
        <h2>Well, sorta.</h2>
      </Hero>
      <section className="page-section">
        <div className={styles.container}>
          <CartTabs selectedTab={selectedTab} onChange={tabChangeHandler} />
          <CartSummary selectedTab={selectedTab} onClick={nextClickHandler} />
        </div>
      </section>
      <section className={`page-section ${styles.section}`}>
        <Newsletter className={styles.newsletter} />
      </section>
    </section>
  );
};

export default Cart;

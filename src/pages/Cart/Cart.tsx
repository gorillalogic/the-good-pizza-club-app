import CartSummary from '../../shared/components/CartSummary/CartSummary';
import CartTabs from '../../shared/components/CartTabs/CartTabs';
import Hero from '../../shared/components/Hero/Hero';
import Newsletter from '../../shared/components/Newsletter/Newsletter';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  return (
    <section className={`page ${styles.cart}`}>
      <Hero image="images/cart_background.png">
        <h1>WE’RE FAST!</h1>
        <h2>Well, sorta.</h2>
      </Hero>
      <section className="page-section">
        <div className={styles.container}>
          <CartTabs />
          <CartSummary />
        </div>
      </section>
      <section className="page-section">
        <Newsletter className={styles.newsletter} />
      </section>
    </section>
  );
};

export default Cart;

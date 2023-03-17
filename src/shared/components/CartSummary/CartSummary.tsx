import { Button } from '@mui/material';
import styles from './CartSummary.module.scss';

const CartSummary: React.FC = () => {
  return (
    <div className={styles.summary}>
      <h4 className={styles.title}>Summary</h4>
      <div className={styles.products}>
        <div className={styles.item}>
          <span>1</span>
          <span>Large Salami & Mushrooms</span>
          <span>$10</span>
        </div>
        <div className={styles.item}>
          <span>1</span>
          <span>Large Salami & Mushrooms</span>
          <span>$10</span>
        </div>
        <div className={styles.item}>
          <span>1</span>
          <span>Large Salami & Mushrooms</span>
          <span>$10</span>
        </div>
      </div>
      <div className={styles.totals}>
        <div className={styles.item}>
          <span>Subtotal</span>
          <span>$40</span>
        </div>
        <div className={styles.item}>
          <span>Total Savings</span>
          <span className={styles.savings}>-$4</span>
        </div>
        <div className={styles.item}>
          <span>Total Savings</span>
          <span>-$4</span>
        </div>
        <div className={styles.item}>
          <span>Express</span>
          <span>$5</span>
        </div>
        <div className={styles.item}>
          <span>Taxes</span>
          <span>$5.4</span>
        </div>
        <div className={styles.item}>
          <span className={styles.total}>Total</span>
          <span>$50</span>
        </div>
      </div>
      <Button variant="contained" color="error">
        Next Step
      </Button>
    </div>
  );
};

export default CartSummary;

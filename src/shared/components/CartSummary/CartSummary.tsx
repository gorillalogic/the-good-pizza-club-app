import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import cartSelectors from '../../../core/store/slices/cart/selectors';
import { Address } from '../../../models/Address';
import { Payment } from '../../../models/Payment';
import { currencyFormat } from '../../utils/number';
import styles from './CartSummary.module.scss';

interface Props {
  selectedTab: number;
  onClick: () => void;
}

function shouldDisableButton(
  selectedTab: number,
  totalItems: number,
  address: Address | null,
  payment: Payment | null
) {
  switch (selectedTab) {
    case 0:
      return totalItems === 0;

    case 1:
      return !address;

    case 2:
      return !payment;

    default:
      return false;
  }
}

const CartSummary: React.FC<Props> = ({ selectedTab, onClick }) => {
  const cartItems = useSelector(cartSelectors.selectItems);
  const cartTotals = useSelector(cartSelectors.totals);
  const selectedAddress = useSelector(cartSelectors.selectAddress);
  const selectedPayment = useSelector(cartSelectors.selectPayment);

  const buttonDisbled = shouldDisableButton(
    selectedTab,
    cartItems.length,
    selectedAddress,
    selectedPayment
  );

  return (
    <div className={styles.summary}>
      <h4 className={styles.title}>Summary</h4>
      <div className={styles.products}>
        {cartItems.length === 0 && <p>Add products to your cart</p>}
        {cartItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <span>{item.quantity}</span>
            <span>{item.product ? item.product.name : 'Custom'}</span>
            <span>{item.subtotal}</span>
          </div>
        ))}
      </div>
      <div className={styles.totals}>
        {cartItems.length > 0 && (
          <>
            <div className={styles.item}>
              <span>Subtotal</span>
              <span>{currencyFormat(cartTotals.subtotal)}</span>
            </div>
            <div className={styles.item}>
              <span>Total Savings</span>
              <span className={styles.savings}>
                -{currencyFormat(cartTotals.totalDiscounts)}
              </span>
            </div>
            <div className={styles.item}>
              <span>Total Taxes</span>
              <span>{currencyFormat(cartTotals.totalTaxes)}</span>
            </div>
            <div className={styles.item}>
              <span>Delivery</span>
              <span>{currencyFormat(5)}</span>
            </div>
          </>
        )}
        <div className={styles.item}>
          <span className={styles.total}>Total</span>
          <span>{currencyFormat(cartTotals.total)}</span>
        </div>
      </div>
      {selectedTab <= 2 && (
        <Button
          variant="contained"
          color="error"
          onClick={onClick}
          disabled={buttonDisbled}
        >
          Next Step
        </Button>
      )}
    </div>
  );
};

export default CartSummary;

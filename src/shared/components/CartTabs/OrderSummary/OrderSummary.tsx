import { Button } from '@mui/material';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../../../core/context/authCtx';
import { useAppDispatch } from '../../../../core/hooks/useAppDispatch';
import { placeOrder } from '../../../../core/store/slices/cart';
import cartSelectors from '../../../../core/store/slices/cart/selectors';
import { Address } from '../../../../models/Address';
import { Payment } from '../../../../models/Payment';
import { currencyFormat } from '../../../utils/number';
import AddressCard from '../AddressCard/AddressCard';
import OrderTable from '../OrderTable/OrderTable';
import PaymentCard from '../PaymentCard/PaymentCard';
import TabHeader from '../TabHeader/TabHeader';
import styles from './OrderSummary.module.scss';

interface Props {
  payment: Payment;
  address: Address;
  onBack: () => void;
}

const OrderSummary: React.FC<Props> = ({ payment, address, onBack }) => {
  const authCtx = useContext(authContext);
  const cartTotals = useSelector(cartSelectors.totals);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const placeOrderHandler = () => {
    dispatch(placeOrder());
    navigate('order-placed', { replace: true });
  };

  return (
    <div data-testid="order-summary" className={styles['order-summary']}>
      <TabHeader
        title="Order summary"
        user={authCtx.user?.name || ''}
        onClick={authCtx.logout}
      />
      <OrderTable hideActions />
      <div className={styles.cards}>
        <PaymentCard payment={payment} hideActions />
        <AddressCard address={address} hideActions />
      </div>
      <div className={styles.summary}>
        <div className={styles.summary__item}>
          <span>Subtotal</span>
          <span>{currencyFormat(cartTotals.subtotal)}</span>
        </div>
        <div className={styles.summary__item}>
          <span>Total Savings</span>
          <span>{currencyFormat(cartTotals.totalDiscounts)}</span>
        </div>
        <div className={styles.summary__item}>
          <span>Delivery</span>
          <span>{currencyFormat(5)}</span>
        </div>
        <div className={styles.summary__item}>
          <span>Taxes</span>
          <span>{currencyFormat(cartTotals.totalTaxes)}</span>
        </div>
        <div className={styles.summary__item}>
          <span className={styles.summary__total}>Total</span>
          <span>{currencyFormat(cartTotals.total)}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <Button
          variant="outlined"
          color="error"
          className={styles.button}
          onClick={onBack}
        >
          Go back
        </Button>
        <Button
          variant="contained"
          color="error"
          className={styles.button}
          onClick={placeOrderHandler}
        >
          Place order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;

import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { format } from 'date-fns';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { authContext } from '../../../../core/context/authCtx';
import cartSelectors from '../../../../core/store/slices/cart/selectors';
import { Address } from '../../../../models/Address';
import { Payment } from '../../../../models/Payment';
import { currencyFormat } from '../../../utils/number';
import OrderTable from '../OrderTable/OrderTable';
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

  return (
    <div className={styles['order-summary']}>
      <TabHeader
        title="Order summary"
        user={authCtx.user?.name || ''}
        onClick={authCtx.logout}
      />
      <OrderTable hideActions />
      <div className={styles.cards}>
        <Card className={styles.card}>
          <CardHeader title={payment.type} />
          <CardContent>
            <img
              src="icons/mastercard.svg"
              alt=""
              className={styles.card__image}
            />
            <p>{payment.number}</p>
            <p>
              <strong>Name on card:</strong> {payment.name}
            </p>
            <p>
              <strong>Expiration:</strong>{' '}
              {format(new Date(payment.expiration), 'MM/yy')}
            </p>
            <p>
              <strong>Security code:</strong> {payment.securityCode}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={address.name} />
          <CardContent>{address.description}</CardContent>
        </Card>
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
          onClick={onBack}
        >
          Place order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;

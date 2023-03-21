import { useContext } from 'react';
import styles from './OrderSummary.module.scss';
import TabHeader from '../TabHeader/TabHeader';
import { authContext } from '../../../../core/context/authCtx';
import OrderTable from '../OrderTable/OrderTable';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Payment } from '../../../../models/Payment';
import { Address } from '../../../../models/Address';
import { currencyFormat } from '../../../utils/number';

interface Props {
  payment: Payment;
  address: Address;
}

const OrderSummary: React.FC<Props> = ({ payment, address }) => {
  const authCtx = useContext(authContext);

  return (
    <div className={styles['order-summary']}>
      <TabHeader
        title="Order summary"
        user={authCtx.user?.name || ''}
        onClick={authCtx.logout}
      />
      <OrderTable />
      <div className={styles.cards}>
        <Card className={styles.card}>
          <CardHeader title={payment.bank} subheader={payment.type} />
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
              <strong>Expiration:</strong> {payment.expiration.toDateString()}
            </p>
            <p>
              <strong>Security code:</strong> {payment.securityCode}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={address.name} />
          <CardContent>{address.address}</CardContent>
        </Card>
      </div>
      <div className={styles.summary}>
        <div className={styles.summary__item}>
          <span>Subtotal</span>
          <span>{currencyFormat(41.7)}</span>
        </div>
        <div className={styles.summary__item}>
          <span>Total Savings</span>
          <span>{currencyFormat(41.7)}</span>
        </div>
        <div className={styles.summary__item}>
          <span>Express</span>
          <span>{currencyFormat(41.7)}</span>
        </div>
        <div className={styles.summary__item}>
          <span>Taxes</span>
          <span>{currencyFormat(41.7)}</span>
        </div>
        <div className={styles.summary__item}>
          <span className={styles.summary__total}>Total</span>
          <span>{currencyFormat(41.7)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

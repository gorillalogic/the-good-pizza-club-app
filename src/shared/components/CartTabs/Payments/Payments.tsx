import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useContext, useState } from 'react';
import { authContext } from '../../../../core/context/authCtx';
import { Payment } from '../../../../models/Payment';
import StarButton from '../../StarButton/StarButton';
import TabHeader from '../TabHeader/TabHeader';
import styles from './Payments.module.scss';

interface Props {
  payments: Payment[];
}

const Payments: React.FC<Props> = ({ payments }) => {
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);
  const authCtx = useContext(authContext);

  return (
    <div className={styles.payments}>
      <TabHeader
        title="Your payments"
        user={authCtx.user?.name || ''}
        onClick={authCtx.logout}
      />
      <div className={styles.content}>
        {payments.map((payment) => (
          <Card key={payment.id} className={styles.card}>
            <CardHeader title={payment.bank} subheader={payment.type} />
            <CardContent>
              <img src="icons/mastercard.svg" alt="" className={styles.image} />
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
            <CardActions>
              <Button
                variant="outlined"
                color="error"
                className={styles.button}
              >
                Delete
              </Button>
              <StarButton
                active={payment.id === selectedPayment}
                onClick={() => setSelectedPayment(payment.id)}
              >
                {payment.id === selectedPayment
                  ? 'Using this card'
                  : 'Use this card'}
              </StarButton>
            </CardActions>
          </Card>
        ))}
      </div>
      <div className={styles.actions}>
        <Button variant="outlined" color="error" className={styles.button}>
          New Payment
        </Button>
      </div>
    </div>
  );
};

export default Payments;

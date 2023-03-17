import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useState } from 'react';
import { Payment } from '../../../../models/Payment';
import StarButton from '../../StarButton/StarButton';
import styles from './Payments.module.scss';

interface Props {
  user: string;
  payments: Payment[];
}

const Payments: React.FC<Props> = ({ user, payments }) => {
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);

  return (
    <div className={styles.payments}>
      <div className={styles.header}>
        <h2>Your Payments</h2>
        <p>
          {user}, not you? <a>Click here</a>
        </p>
      </div>
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
    </div>
  );
};

export default Payments;

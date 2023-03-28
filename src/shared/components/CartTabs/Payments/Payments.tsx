import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { format } from 'date-fns';
import { useContext } from 'react';
import { authContext } from '../../../../core/context/authCtx';
import { Payment } from '../../../../models/Payment';
import StarButton from '../../StarButton/StarButton';
import TabHeader from '../TabHeader/TabHeader';
import styles from './Payments.module.scss';

interface Props {
  payments: Payment[];
  selectedPayment: Payment | null;
  onSelect: (payment: Payment) => void;
}

const Payments: React.FC<Props> = ({ payments, selectedPayment, onSelect }) => {
  const authCtx = useContext(authContext);

  let content: React.ReactNode;

  if (payments.length === 0) {
    content = <p>You have not added any payment method</p>;
  } else {
    content = payments.map((payment) => (
      <Card key={payment.id} className={styles.card}>
        <CardHeader title={payment.bank} subheader={payment.type} />
        <CardContent>
          <img src="icons/mastercard.svg" alt="" className={styles.image} />
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
        <CardActions>
          <Button variant="outlined" color="error" className={styles.button}>
            Delete
          </Button>
          <StarButton
            active={payment.id === selectedPayment?.id}
            onClick={() => onSelect(payment)}
          >
            {payment.id === selectedPayment?.id
              ? 'Using this card'
              : 'Use this card'}
          </StarButton>
        </CardActions>
      </Card>
    ));
  }

  return (
    <div className={styles.payments}>
      <TabHeader
        title="Your payments"
        user={authCtx.user?.name || ''}
        onClick={authCtx.logout}
      />
      <div className={styles.content}>{content}</div>
      <div className={styles.actions}>
        <Button variant="outlined" color="error" className={styles.button}>
          New Payment
        </Button>
      </div>
    </div>
  );
};

export default Payments;

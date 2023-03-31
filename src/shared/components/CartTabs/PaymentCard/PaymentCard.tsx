import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { format } from 'date-fns';
import { Payment } from '../../../../models/Payment';
import StarButton from '../../StarButton/StarButton';
import styles from './PaymentCard.module.scss';

interface Props {
  payment: Payment;
  active?: boolean;
  hideActions?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
}

const PaymentCard: React.FC<Props> = ({
  payment,
  active,
  hideActions,
  onDelete,
  onSelect,
}) => {
  return (
    <Card className={styles.card}>
      <CardHeader title={`${payment.company} - ${payment.type}`} />
      <CardContent>
        <img
          src={`icons/${payment.company.toLowerCase()}.svg`}
          alt=""
          className={styles.image}
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
      {!hideActions && (
        <CardActions>
          <Button
            variant="outlined"
            color="error"
            className={styles.button}
            onClick={onDelete}
          >
            Delete
          </Button>
          <StarButton active={active} onClick={onSelect}>
            {active ? 'Using this card' : 'Use this card'}
          </StarButton>
        </CardActions>
      )}
    </Card>
  );
};

export default PaymentCard;

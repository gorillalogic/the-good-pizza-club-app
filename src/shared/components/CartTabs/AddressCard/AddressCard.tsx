import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
} from '@mui/material';
import { Address } from '../../../../models/Address';
import StarButton from '../../StarButton/StarButton';
import styles from './AddressCard.module.scss';

interface Props {
  address: Address;
  active?: boolean;
  hideActions?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
}

const AddressCard: React.FC<Props> = ({
  address,
  active,
  hideActions,
  onDelete,
  onSelect,
}) => {
  return (
    <Card data-testid="address-card" className={styles.card}>
      <CardHeader title={address.name} />
      <CardContent>
        <Icon className={styles.image}>location_on</Icon>
        <span>{address.description}</span>
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
            {active ? 'Using this address' : 'Use this address'}
          </StarButton>
        </CardActions>
      )}
    </Card>
  );
};

export default AddressCard;

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { Address } from '../../../../models/Address';
import StarButton from '../../StarButton/StarButton';
import styles from './Addresses.module.scss';

interface Props {
  addresses: Address[];
  user: string;
}

const Addresses: React.FC<Props> = ({ addresses, user }) => {
  return (
    <div className={styles.addresses}>
      <div className={styles.header}>
        <h2>Your Addresses</h2>
        <p>
          {user}, not you? <a>Click here</a>
        </p>
      </div>
      <div className={styles.container}>
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardHeader title={address.name} />
            <CardContent>{address.address}</CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="error"
                className={styles.button}
              >
                Edit
              </Button>
              <StarButton active={address.isDefault}>
                {address.isDefault ? 'Default Address' : 'Make default Address'}
              </StarButton>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Addresses;

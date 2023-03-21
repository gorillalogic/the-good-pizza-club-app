import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useContext } from 'react';
import { authContext } from '../../../../core/context/authCtx';
import { Address } from '../../../../models/Address';
import StarButton from '../../StarButton/StarButton';
import TabHeader from '../TabHeader/TabHeader';
import styles from './Addresses.module.scss';

interface Props {
  addresses: Address[];
}

const Addresses: React.FC<Props> = ({ addresses }) => {
  const authCtx = useContext(authContext);

  return (
    <div className={styles.addresses}>
      <TabHeader
        title="Your addresses"
        user={authCtx.user?.name || ''}
        onClick={authCtx.logout}
      />
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

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
  selectedAddress: Address | null;
  onSelect: (address: Address) => void;
}

const Addresses: React.FC<Props> = ({
  addresses,
  selectedAddress,
  onSelect,
}) => {
  const authCtx = useContext(authContext);

  let content: React.ReactNode;

  if (addresses.length === 0) {
    content = <p>You have not added any address</p>;
  } else {
    content = addresses.map((address) => (
      <Card key={address.id} className={styles.card}>
        <CardHeader title={address.name} />
        <CardContent>{address.description}</CardContent>
        <CardActions>
          <Button variant="outlined" color="error" className={styles.button}>
            Edit
          </Button>
          <StarButton
            active={selectedAddress?.id === address.id}
            onClick={() => onSelect(address)}
          >
            {selectedAddress?.id === address.id
              ? 'Using this address'
              : 'Use this address'}
          </StarButton>
        </CardActions>
      </Card>
    ));
  }

  return (
    <>
      <div className={styles.addresses}>
        <TabHeader
          title="Your addresses"
          user={authCtx.user?.name || ''}
          onClick={authCtx.logout}
        />
        <div className={styles.content}>{content}</div>
        <div className={styles.actions}>
          <Button variant="outlined" color="error" className={styles.button}>
            New address
          </Button>
        </div>
      </div>
    </>
  );
};

export default Addresses;

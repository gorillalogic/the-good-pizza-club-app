import { Icon } from '@mui/material';
import { useSelector } from 'react-redux';
import cartSelectors from '../../../core/store/slices/cart/selectors';
import Map from '../../../shared/components/Map/Map';
import Stepper from '../../../shared/components/Stepper/Stepper';
import { CART_STEPS } from '../../../shared/constants/global.constants';
import styles from './OrderPlaced.module.scss';

const OrderPlaced: React.FC = () => {
  const selectedAddress = useSelector(cartSelectors.selectAddress);

  const location = selectedAddress && {
    lat: selectedAddress.lat,
    lng: selectedAddress.lng,
  };

  return (
    <div data-testid="order-placed" className={styles['order-placed']}>
      <h2 className={styles.title}>Your order has been completed!</h2>
      <span>N051661</span>
      <p className={styles.label}>Order number</p>
      <Stepper steps={CART_STEPS} className={styles.stepper} activeStep={1} />
      {location && (
        <Map
          className={styles.map}
          options={{
            ...location,
            zoom: 15,
          }}
          markers={[location]}
        />
      )}
      <p className={styles.label}>
        Problems with the order?{' '}
        <a className={styles.link}>
          Get in touch with us <Icon className={styles.icon}>help_outline</Icon>
        </a>
      </p>
    </div>
  );
};

export default OrderPlaced;

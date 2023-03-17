import { Button, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../core/store/slices/auth/selectors';
import { CardTypes } from '../../../models/Payment';
import Addresses from './Addresses/Addresses';
import CartPanel from './CartPanel/CartPanel';
import styles from './CartTabs.module.scss';
import OrderTable from './OrderTable/OrderTable';
import Payments from './Payments/Payments';

const addresses = [
  {
    id: 0,
    name: 'Home',
    address: '456 Bourbon Street, Ingrid Complex, #504, New Orleans, LA, 09873',
    isDefault: true,
  },
  {
    id: 1,
    name: 'Home',
    address: '456 Bourbon Street, Ingrid Complex, #504, New Orleans, LA, 09873',
    isDefault: false,
  },
  {
    id: 2,
    name: 'Home',
    address: '456 Bourbon Street, Ingrid Complex, #504, New Orleans, LA, 09873',
    isDefault: false,
  },
];

const payments = [
  {
    id: 0,
    bank: 'Bancolombia',
    type: CardTypes.Credit,
    name: 'Juan Lopez',
    number: 1111111111,
    securityCode: 123,
    expiration: new Date(),
  },
  {
    id: 1,
    bank: 'Bancolombia',
    type: CardTypes.Credit,
    name: 'Juan Lopez',
    number: 1111111111,
    securityCode: 123,
    expiration: new Date(),
  },
  {
    id: 2,
    bank: 'Bancolombia',
    type: CardTypes.Credit,
    name: 'Juan Lopez',
    number: 1111111111,
    securityCode: 123,
    expiration: new Date(),
  },
];

const CartTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useSelector(getUser);

  const handleChange = (_: React.SyntheticEvent, value: number) => {
    setSelectedTab(value);
  };

  return (
    <div className={styles.tabs}>
      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="Order" />
        <Tab label="Address" />
        <Tab label="Payment" />
        <Tab label="Checkout" />
      </Tabs>
      <div className={styles.content}>
        <CartPanel selectedTab={selectedTab} index={0}>
          <OrderTable />
          <Button variant="outlined" color="error" className={styles.button}>
            Need another?
          </Button>
        </CartPanel>
        <CartPanel selectedTab={selectedTab} index={1}>
          <Addresses addresses={addresses} user={user?.name || ''} />
          <Button variant="outlined" color="error" className={styles.button}>
            New address
          </Button>
        </CartPanel>
        <CartPanel selectedTab={selectedTab} index={2}>
          <Payments payments={payments} user={user?.name || ''} />
          <Button variant="outlined" color="error" className={styles.button}>
            New payment
          </Button>
        </CartPanel>
        <CartPanel selectedTab={selectedTab} index={3}>
          <p>Checkout</p>
        </CartPanel>
      </div>
    </div>
  );
};

export default CartTabs;

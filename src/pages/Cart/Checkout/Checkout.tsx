import { CircularProgress } from '@mui/material';
import { useCallback, useState } from 'react';
import { useThunkDispatch } from '../../../core/hooks/useThunkDispatch';
import {
  getAddressesAsync,
  getPaymentsAsync,
} from '../../../core/store/slices/user/asyncThunks';
import CartSummary from '../../../shared/components/CartSummary/CartSummary';
import CartTabs from '../../../shared/components/CartTabs/CartTabs';
import styles from './Checkout.module.scss';

const Checkout: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabChangeHandler = useCallback((value: number) => {
    setSelectedTab(value);
  }, []);

  const nextClickHandler = useCallback(() => {
    setSelectedTab(selectedTab + 1);
  }, [selectedTab]);

  const { data, loading, error } = useThunkDispatch([
    getAddressesAsync(),
    getPaymentsAsync(),
  ]);

  let content: React.ReactNode;

  if (loading) {
    content = <CircularProgress color="primary" />;
  }

  if (error) {
    content = <p>Error loading data...</p>;
  }

  if (data) {
    content = (
      <div className={styles.content}>
        <CartTabs selectedTab={selectedTab} onChange={tabChangeHandler} />
        <CartSummary selectedTab={selectedTab} onClick={nextClickHandler} />
      </div>
    );
  }

  return <div className={styles.checkout}>{content}</div>;
};

export default Checkout;

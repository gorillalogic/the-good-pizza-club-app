import { CircularProgress } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import useScrollToRef from '../../../core/hooks/useScrollToRef';
import { useThunkDispatch } from '../../../core/hooks/useThunkDispatch';
import {
  getAddressesAsync,
  getPaymentsAsync,
} from '../../../core/store/slices/user/asyncThunks';
import CartSummary from '../../../shared/components/CartSummary/CartSummary';
import CartTabs from '../../../shared/components/CartTabs/CartTabs';
import styles from './Checkout.module.scss';

const Checkout: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollTo } = useScrollToRef();
  const [selectedTab, setSelectedTab] = useState(0);
  const tabChangeHandler = useCallback((value: number) => {
    setSelectedTab(value);
  }, []);

  const nextClickHandler = useCallback(() => {
    setSelectedTab(selectedTab + 1);
    scrollTo(ref);
  }, [selectedTab]);

  const { data, loading, error } = useThunkDispatch([
    getAddressesAsync(),
    getPaymentsAsync(),
  ]);

  let content: React.ReactNode;

  if (loading) {
    content = <CircularProgress data-testid="loader" color="primary" />;
  }

  if (error) {
    content = <p data-testid="error">Error loading data...</p>;
  }

  if (data) {
    content = (
      <div data-testid="content" className={styles.content} ref={ref}>
        <CartTabs selectedTab={selectedTab} onChange={tabChangeHandler} />
        <CartSummary selectedTab={selectedTab} onClick={nextClickHandler} />
      </div>
    );
  }

  return (
    <div data-testid="checkout" className={styles.checkout}>
      {content}
    </div>
  );
};

export default Checkout;

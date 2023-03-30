import { CircularProgress, Tab, Tabs } from '@mui/material';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../core/hooks/useAppDispatch';
import { useThunkDispatch } from '../../../core/hooks/useThunkDispatch';
import { selectAddress, selectPayment } from '../../../core/store/slices/cart';
import cartSelectors from '../../../core/store/slices/cart/selectors';
import {
  fetchAddreses,
  fetchPayments,
} from '../../../core/store/slices/user/asyncThunks';
import { Address } from '../../../models/Address';
import { Payment } from '../../../models/Payment';
import Addresses from './Addresses/Addresses';
import CartPanel from './CartPanel/CartPanel';
import styles from './CartTabs.module.scss';
import OrderSummary from './OrderSummary/OrderSummary';
import OrderTable from './OrderTable/OrderTable';
import Payments from './Payments/Payments';

interface Props {
  selectedTab: number;
  onChange: (value: number) => void;
}

const CartTabs: React.FC<Props> = ({ selectedTab, onChange }) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useThunkDispatch([
    fetchAddreses(),
    fetchPayments(),
  ]);

  const [addresses, payments] = (data || []) as [Address[], Payment[]];
  const totalCartItems = useSelector(cartSelectors.totalItems);
  const selectedAddress = useSelector(cartSelectors.selectAddress);
  const selectedPayment = useSelector(cartSelectors.selectPayment);

  const changeAddressHandler = useCallback((address: Address) => {
    dispatch(selectAddress(address));
  }, []);

  const changePaymentHandler = useCallback((payment: Payment) => {
    dispatch(selectPayment(payment));
  }, []);

  let content: React.ReactNode;

  if (loading) {
    content = <CircularProgress color="primary" />;
  }

  if (error) {
    content = <p>Error loading data...</p>;
  }

  if (addresses && payments) {
    content = (
      <>
        <CartPanel selectedTab={selectedTab} index={0}>
          <OrderTable />
        </CartPanel>
        <CartPanel selectedTab={selectedTab} index={1}>
          <Addresses
            addresses={addresses}
            selectedAddress={selectedAddress}
            onSelect={changeAddressHandler}
          />
        </CartPanel>
        <CartPanel selectedTab={selectedTab} index={2}>
          <Payments
            payments={payments}
            selectedPayment={selectedPayment}
            onSelect={changePaymentHandler}
          />
        </CartPanel>
        <CartPanel selectedTab={selectedTab} index={3}>
          {selectedPayment && selectedAddress && (
            <OrderSummary
              payment={selectedPayment}
              address={selectedAddress}
              onBack={() => onChange(selectedTab - 1)}
            />
          )}
        </CartPanel>
      </>
    );
  }

  return (
    <div className={styles.tabs}>
      <Tabs
        value={selectedTab}
        onChange={(_, value: number) => onChange(value)}
      >
        <Tab label="Order" />
        <Tab label="Address" disabled={false} />
        <Tab
          label="Payment"
          disabled={totalCartItems === 0 || !selectedAddress}
        />
        <Tab
          label="Checkout"
          disabled={totalCartItems === 0 || !selectedPayment}
        />
      </Tabs>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default CartTabs;

import { Button } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { authContext } from '../../../../core/context/authCtx';
import { useAppDispatch } from '../../../../core/hooks/useAppDispatch';
import { showSnackbar } from '../../../../core/store/slices/snackbar';
import {
  createPaymentAsync,
  deletePaymentAsync,
} from '../../../../core/store/slices/user/asyncThunks';
import { Payment } from '../../../../models/Payment';
import CreatePaymentDialog from '../CreatePaymentDialog/CreatePaymentDialog';
import PaymentCard from '../PaymentCard/PaymentCard';
import RemoveDialog from '../RemoveDialog/RemoveDialog';
import TabHeader from '../TabHeader/TabHeader';
import styles from './Payments.module.scss';

interface Props {
  payments: Payment[];
  selectedPayment: Payment | null;
  onSelect: (payment: Payment) => void;
}

const Payments: React.FC<Props> = ({ payments, selectedPayment, onSelect }) => {
  const authCtx = useContext(authContext);
  const dispatch = useAppDispatch();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  let selectedPaymentId: number | undefined;

  const toggleCreateDialog = useCallback(() => {
    setOpenCreateDialog((prev) => !prev);
  }, []);

  const toggleRemoveDialog = useCallback((id?: number) => {
    selectedPaymentId = id;
    setOpenRemoveDialog((prev) => !prev);
  }, []);

  const createPayment = useCallback(async (data: Partial<Payment>) => {
    try {
      await dispatch(createPaymentAsync(data)).unwrap();
      dispatch(
        showSnackbar({
          color: 'success',
          message: 'Payment method added succesfully!',
        })
      );
      toggleCreateDialog();
    } catch (error) {
      dispatch(
        showSnackbar({ color: 'error', message: 'Error adding payment method' })
      );
    }
  }, []);

  const deletePayment = useCallback(async () => {
    if (selectedPaymentId !== undefined) {
      try {
        await dispatch(deletePaymentAsync(selectedPaymentId)).unwrap();
        dispatch(
          showSnackbar({
            color: 'success',
            message: 'Payment method deleted succesfully!',
          })
        );
        toggleRemoveDialog();
      } catch (error) {
        dispatch(
          showSnackbar({
            color: 'error',
            message: 'Error deleting payment method',
          })
        );
      }
    }
  }, []);

  let content: React.ReactNode;

  if (payments.length === 0) {
    content = <p>You have not added any payment method</p>;
  } else {
    content = payments.map((payment) => (
      <PaymentCard
        key={payment.id}
        payment={payment}
        active={payment.id === selectedPayment?.id}
        onDelete={() => toggleRemoveDialog(payment.id)}
        onSelect={() => onSelect(payment)}
      />
    ));
  }

  return (
    <>
      <div data-testid="payments" className={styles.payments}>
        <TabHeader
          title="Your payments"
          user={authCtx.user?.name || ''}
          onClick={authCtx.logout}
        />
        <div className={styles.content}>{content}</div>
        <div className={styles.actions}>
          <Button
            variant="outlined"
            color="error"
            className={styles.button}
            onClick={toggleCreateDialog}
          >
            New Payment
          </Button>
        </div>
      </div>
      <CreatePaymentDialog
        open={openCreateDialog}
        onClose={toggleCreateDialog}
        onConfirm={createPayment}
      />
      <RemoveDialog
        title="Delete payment method"
        content="Do you want to delete this payment method?"
        open={openRemoveDialog}
        onClose={toggleRemoveDialog}
        onConfirm={deletePayment}
      />
    </>
  );
};

export default Payments;

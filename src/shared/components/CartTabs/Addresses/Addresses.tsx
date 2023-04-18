import { Button } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { authContext } from '../../../../core/context/authCtx';
import { useAppDispatch } from '../../../../core/hooks/useAppDispatch';
import { showSnackbar } from '../../../../core/store/slices/snackbar';
import {
  createAddressAsync,
  deleteAddressAsync,
} from '../../../../core/store/slices/user/asyncThunks';
import { Address } from '../../../../models/Address';
import AddressCard from '../AddressCard/AddressCard';
import CreateAddressDialog from '../CreateAddressDialog/CreateAddressDialog';
import RemoveDialog from '../RemoveDialog/RemoveDialog';
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
  const dispatch = useAppDispatch();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  let selectedAddressId: number | undefined;

  const toggleCreateDialog = useCallback(() => {
    setOpenCreateDialog((prev) => !prev);
  }, [open]);

  const toggleRemoveDialog = useCallback(
    (id?: number) => {
      selectedAddressId = id;
      setOpenRemoveDialog((prev) => !prev);
    },
    [open]
  );

  const createAddress = useCallback(async (data: Partial<Address>) => {
    try {
      await dispatch(createAddressAsync(data)).unwrap();
      dispatch(
        showSnackbar({
          color: 'success',
          message: 'Address created successfully!',
        })
      );
    } catch (error) {
      dispatch(
        showSnackbar({ color: 'error', message: 'Error creating address' })
      );
    } finally {
      toggleCreateDialog();
    }
  }, []);

  const deleteAddress = useCallback(async () => {
    if (selectedAddressId !== undefined) {
      try {
        await dispatch(deleteAddressAsync(selectedAddressId)).unwrap();
        dispatch(
          showSnackbar({
            color: 'success',
            message: 'Address deleted successfully!',
          })
        );
      } catch (error) {
        dispatch(
          showSnackbar({ color: 'error', message: 'Error deleting address' })
        );
      } finally {
        toggleRemoveDialog();
      }
    }
  }, []);

  let content: React.ReactNode;

  if (addresses.length === 0) {
    content = <p>You have not added any address</p>;
  } else {
    content = addresses.map((address) => (
      <AddressCard
        key={address.id}
        address={address}
        active={selectedAddress?.id === address.id}
        onDelete={() => toggleRemoveDialog(address.id)}
        onSelect={() => onSelect(address)}
      />
    ));
  }

  return (
    <>
      <div data-testid="addresses" className={styles.addresses}>
        <TabHeader
          title="Your addresses"
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
            New address
          </Button>
        </div>
      </div>
      <CreateAddressDialog
        open={openCreateDialog}
        onClose={toggleCreateDialog}
        onConfirm={createAddress}
      />
      <RemoveDialog
        title="Delete Address"
        content="Do you want to delete this address?"
        open={openRemoveDialog}
        onClose={toggleRemoveDialog}
        onConfirm={deleteAddress}
      />
    </>
  );
};

export default Addresses;

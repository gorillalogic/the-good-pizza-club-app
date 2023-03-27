import {
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../core/hooks/useAppDispatch';
import {
  removeProduct,
  updateProductQuantity,
} from '../../../../core/store/slices/cart';
import cartSelectors from '../../../../core/store/slices/cart/selectors';
import { CartItem } from '../../../../models/Cart';
import { currencyFormat } from '../../../utils/number';
import Counter from '../../Counter/Counter';
import RemoveDialog from '../RemoveDialog/RemoveDialog';
import styles from './OrderTable.module.scss';

let itemId: number | null = null;

const OrderTable: React.FC<{ hideActions?: boolean }> = ({ hideActions }) => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector(cartSelectors.selectItems);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const counterChangeHander = (item: CartItem, value: number) => {
    dispatch(updateProductQuantity({ item, quantity: value }));
  };

  const openModalHandler = (id: number) => {
    setOpen(true);
    itemId = id;
  };

  const closeModalHandler = () => {
    setOpen(false);
    itemId = null;
  };

  const confirmModalHandler = () => {
    if (itemId) {
      dispatch(removeProduct(itemId));
      itemId = null;
    }

    setOpen(false);
  };

  return (
    <>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ width: 100 }}>
              Quantity
            </TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>
                <p>No products in your cart</p>
              </TableCell>
            </TableRow>
          )}
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Counter
                  initialValue={item.quantity}
                  minValue={1}
                  onChange={(value) => counterChangeHander(item, value)}
                />
              </TableCell>
              <TableCell align="left" className={styles.cell}>
                <div>
                  <span>
                    {item.product ? item.product.name : 'Custom'} (
                    {item.size.name})
                  </span>
                  <button className={styles.customize}>Customize</button>
                </div>
                {item.promotion && (
                  <div className={styles.discount}>{item.promotion.name}</div>
                )}
              </TableCell>
              <TableCell align="right">
                {currencyFormat(item.subtotal || 0)}
              </TableCell>
              <TableCell>
                <button
                  className={styles.delete}
                  onClick={() => openModalHandler(item.id)}
                >
                  <Icon>delete</Icon>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!hideActions && (
        <div className={styles.actions}>
          <Button
            variant="outlined"
            color="error"
            className={styles.button}
            onClick={() => navigate('/menu')}
          >
            Need another?
          </Button>
        </div>
      )}
      <RemoveDialog
        open={open}
        onClose={closeModalHandler}
        onConfirm={confirmModalHandler}
      />
    </>
  );
};

export default OrderTable;

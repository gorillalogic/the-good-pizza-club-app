import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { currencyFormat } from '../../../utils/number';
import Counter from '../../Counter/Counter';
import styles from './OrderTable.module.scss';

const OrderTable: React.FC = () => {
  return (
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
        <TableRow>
          <TableCell>
            <Counter initialValue={1} minValue={0} />
          </TableCell>
          <TableCell align="left" className={styles.cell}>
            <div>
              <span>Product 1</span>
              <button className={styles.customize}>Customize</button>
            </div>
            <div className={styles.discount}>33% OFF</div>
          </TableCell>
          <TableCell align="right">{currencyFormat(10)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Counter initialValue={1} minValue={0} />
          </TableCell>
          <TableCell align="left">
            <span>Product 1</span>
            <button className={styles.customize}>Customize</button>
          </TableCell>
          <TableCell align="right">{currencyFormat(10)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Counter initialValue={1} minValue={0} />
          </TableCell>
          <TableCell align="left">
            <span>Product 1</span>
            <button className={styles.customize}>Customize</button>
          </TableCell>
          <TableCell align="right">{currencyFormat(10)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OrderTable;

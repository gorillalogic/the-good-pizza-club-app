import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Record } from '../../../../../models/Record';
import styles from './AdditionGroup.module.scss';

interface Props {
  title: string;
  items: Record[];
  onClick: (item: Record, quantity: number) => void;
}

const AdditionGroup: React.FC<Props> = ({ title, items, onClick }) => {
  const [selectedItem, setSelectedItem] = useState('default');
  const [quantity, setQuantity] = useState('default');

  const selectItemChangeHandler = (event: SelectChangeEvent) => {
    const value = event.target.value;

    setSelectedItem(value);
  };

  const selectQuantityChangeHadler = (event: SelectChangeEvent) => {
    const value = event.target.value;

    setQuantity(value);
  };

  const clickHandler = () => {
    const item = items.find((i) => i.id === parseInt(selectedItem));

    if (item) {
      setSelectedItem('default');
      setQuantity('default');
      onClick(item, parseInt(quantity));
    }
  };

  return (
    <div data-testid="customize-dialog-addition-group" className={styles.group}>
      <span>{title}</span>
      <Select
        role="select"
        value={selectedItem}
        className={styles.select}
        onChange={selectItemChangeHandler}
      >
        <MenuItem value="default" disabled>
          Select one
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <div className={styles.group__actions}>
        <Select
          role="select"
          value={quantity}
          className={styles.select}
          onChange={selectQuantityChangeHadler}
        >
          <MenuItem value="default" disabled>
            Quantity
          </MenuItem>
          {[1, 2, 3, 4, 5].map((i) => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="error"
          onClick={clickHandler}
          disabled={selectedItem === 'default' || quantity === 'default'}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AdditionGroup;

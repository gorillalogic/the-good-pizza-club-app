import { Icon, IconButton } from '@mui/material';
import { useState } from 'react';
import styles from './Counter.module.scss';

interface Props {
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
}

const Counter: React.FC<Props> = ({
  initialValue = 0,
  minValue,
  maxValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleAdd = () => {
    const newValue = value + 1;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  const handleSubstract = () => {
    const newValue = value - 1;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div className={styles.counter}>
      <IconButton
        className={styles.button}
        onClick={handleSubstract}
        disabled={minValue !== undefined ? value === minValue : false}
      >
        <Icon>remove</Icon>
      </IconButton>
      <span className={styles.label}>{value}</span>
      <IconButton
        className={styles.button}
        onClick={handleAdd}
        disabled={maxValue !== undefined ? value === maxValue : false}
      >
        <Icon>add</Icon>
      </IconButton>
    </div>
  );
};

export default Counter;

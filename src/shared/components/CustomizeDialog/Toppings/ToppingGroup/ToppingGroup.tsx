import { Button } from '@mui/material';
import { IdTypedObject } from '../../../../../models/Base';
import styles from './ToppingGroup.module.scss';

interface Props {
  title: string;
  type: string;
  items: IdTypedObject[];
  selectedItem: number | number[] | undefined;
  onChange: (item: { type: string; id?: number }) => void;
}

const ToppingGroup: React.FC<Props> = ({
  title,
  type,
  items,
  selectedItem,
  onChange,
}) => {
  const isArray = selectedItem instanceof Array;

  return (
    <div className={styles.group}>
      <span className={styles.group__title}>{title}</span>
      <div className={styles.group__buttons}>
        {items.map((item) => (
          <Button
            key={item.id}
            variant="outlined"
            color="error"
            className={
              isArray
                ? selectedItem.includes(item.id)
                  ? styles.active
                  : ''
                : selectedItem === item.id
                ? styles.active
                : ''
            }
            onClick={() => onChange(item)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <button onClick={() => onChange({ type })}>No {title}?</button>
    </div>
  );
};

export default ToppingGroup;

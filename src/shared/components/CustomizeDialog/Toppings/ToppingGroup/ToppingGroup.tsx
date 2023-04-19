import { Button } from '@mui/material';
import { Record } from '../../../../../models/Record';
import styles from './ToppingGroup.module.scss';

interface Props {
  title: string;
  type: string;
  items: Record[];
  selectedItem: Record | Record[] | undefined;
  onChange: (type: string, item?: Record) => void;
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
    <div data-testid="customize-dialog-topping-group" className={styles.group}>
      <span className={styles.group__title}>{title}</span>
      <div className={styles.group__buttons}>
        {items.map((item) => (
          <Button
            key={item.id}
            variant="outlined"
            color="error"
            className={
              isArray
                ? selectedItem.findIndex((i) => i.id === item.id) !== -1
                  ? styles.active
                  : ''
                : selectedItem?.id === item.id
                ? styles.active
                : ''
            }
            onClick={() => onChange(item.type, item)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <button onClick={() => onChange(type)}>No {title}?</button>
    </div>
  );
};

export default ToppingGroup;

import { Icon, IconButton } from '@mui/material';
import { QuantifiedRecord, Record } from '../../../../models/Record';
import AdditionGroup from './AdditionGroup/AdditionGroup';
import styles from './Additions.module.scss';

interface Props {
  drinks: Record[];
  salads: Record[];
  appetizers: Record[];
  desserts: Record[];
  selectedItems: QuantifiedRecord[];
  onChange: (item: Record, quantity: number) => void;
}
const Additions: React.FC<Props> = ({
  drinks,
  salads,
  appetizers,
  desserts,
  selectedItems,
  onChange,
}) => {
  return (
    <div data-testid="customize-dialog-additions" className={styles.additions}>
      <span className={styles.title}>Need anything else?</span>
      <div className={styles.groups}>
        <AdditionGroup title="Drinks" items={drinks} onClick={onChange} />
        <AdditionGroup title="Salads" items={salads} onClick={onChange} />
        <AdditionGroup
          title="Appetizers"
          items={appetizers}
          onClick={onChange}
        />
        <AdditionGroup title="Desserts" items={desserts} onClick={onChange} />
      </div>
      <div className={styles.selections}>
        {selectedItems.map((item) => (
          <div key={`${item.type}-${item.id}`} className={styles.item}>
            <span>{item.name}</span>
            <strong>x ({item.quantity})</strong>
            <div>
              <IconButton color="error" onClick={() => onChange(item, 0)}>
                <Icon>delete</Icon>
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Additions;

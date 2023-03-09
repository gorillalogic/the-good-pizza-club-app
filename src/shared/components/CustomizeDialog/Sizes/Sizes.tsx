import { IdTypedObject } from '../../../../models/Base';
import styles from './Sizes.module.scss';

interface Props {
  sizes: IdTypedObject[];
  selectedSize: number | undefined;
  onSelect: (size: IdTypedObject) => void;
}

const Sizes: React.FC<Props> = ({ sizes, selectedSize, onSelect }) => {
  return (
    <div className={styles.sizes}>
      <span className={styles.title}>Choose your size</span>
      <div className={styles.wrapper}>
        {sizes.map((size) => (
          <div key={size.id} className={styles.group}>
            <button
              onClick={() => onSelect(size)}
              className={size.id === selectedSize ? styles.active : ''}
            ></button>
            <label>{size.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sizes;

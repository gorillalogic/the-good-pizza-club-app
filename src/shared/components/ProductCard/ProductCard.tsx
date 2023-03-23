import { Button } from '@mui/material';
import { Product } from '../../../models/Product';
import { currencyFormat } from '../../utils/number';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  onClick?: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onClick }) => {
  const classes = [styles.card, styles[`card--${product.color}`]].join(' ');

  return (
    <div className={classes}>
      <img src={product.image} alt="" className={styles.image} />
      <span className={styles.title}>{product.name}</span>
      <div className={styles.info}>
        <span>{product.weight} gr</span>
        <span>{product.calories} cal</span>
      </div>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.actions}>
        <div>
          <span>starts at</span>
          <span className={styles.price}>{currencyFormat(product.price)}</span>
        </div>
        <Button
          variant="contained"
          color="error"
          className={styles.button}
          sx={{ minWidth: 130 }}
          onClick={() => onClick && onClick(product)}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

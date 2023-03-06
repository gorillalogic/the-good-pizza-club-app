import { Button, Icon } from '@mui/material';
import { Promotion } from '../../../models/Promotion';
import styles from './PromotionCard.module.scss';

interface Props {
  promotion: Promotion;
  info?: string;
  contentPosition?: 'left' | 'right';
}

const PromotionCard: React.FC<Props> = ({
  promotion,
  info,
  contentPosition = 'right',
}) => {
  const style = {
    '--image': `url(${promotion.image})`,
  } as React.CSSProperties;
  const classes = `${styles['promotion-card']} ${
    contentPosition === 'right'
      ? styles['promotion-card--right']
      : styles['promotion-card--left']
  }`;

  return (
    <div className={classes} style={style}>
      <div className={styles.content}>
        <span className={styles.title}>{promotion.name}</span>
        <span className={styles.subtitle}>{promotion.product.name}</span>
        <span className={styles.description}>{promotion.description}</span>
        <Button variant="contained" color="error">
          <Icon className={styles.icon}>av_timer</Icon>
          Add to cart
        </Button>
        {info && <p className={styles.info}>{info}</p>}
      </div>
    </div>
  );
};

export default PromotionCard;

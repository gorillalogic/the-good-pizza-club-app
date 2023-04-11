import { Button, Icon } from '@mui/material';
import { Promotion } from '../../../models/Promotion';
import styles from './PromotionCard.module.scss';

interface Props {
  promotion: Promotion;
  info?: string;
  contentPosition?: 'left' | 'right';
  compact?: boolean;
  onClick?: (promotion: Promotion) => void;
}

const PromotionCard: React.FC<Props> = ({
  promotion,
  info,
  contentPosition = 'right',
  compact = false,
  onClick,
}) => {
  const style = {
    '--image': `url(${promotion.image})`,
  } as React.CSSProperties;
  const classes = `
    ${styles['promotion-card']}
    ${compact ? styles['promotion-card--compact'] : ''}
    ${
      contentPosition === 'right'
        ? styles['promotion-card--right']
        : styles['promotion-card--left']
    }`;

  return (
    <div className={classes} style={style} data-testid="promotion-card">
      <div className={styles.content}>
        <span className={styles.title}>{promotion.name}</span>
        <span className={styles.subtitle}>{promotion.product.name}</span>
        <span className={styles.description}>{promotion.description}</span>
        <Button
          variant="contained"
          color="error"
          onClick={() => onClick && onClick(promotion)}
        >
          <Icon className={styles.icon}>av_timer</Icon>
          Add to cart
        </Button>
        {info && <p className={styles.info}>{info}</p>}
      </div>
    </div>
  );
};

export default PromotionCard;

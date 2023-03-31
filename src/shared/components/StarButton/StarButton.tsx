import { Icon } from '@mui/material';
import styles from './StarButton.module.scss';

interface Props extends React.PropsWithChildren {
  active?: boolean;
  onClick?: (event?: React.SyntheticEvent) => void;
}

const StarButton: React.FC<Props> = ({ children, active, onClick }) => {
  const classes = ` ${styles.button} ${active ? styles['button--active'] : ''}`;

  return (
    <button className={classes} onClick={onClick}>
      <span>{children}</span>
      <Icon className={styles.icon}>star</Icon>
    </button>
  );
};

export default StarButton;

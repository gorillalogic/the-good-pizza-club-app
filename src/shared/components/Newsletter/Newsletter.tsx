import { Icon, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import styles from './Newsletter.module.scss';

interface Props {
  className?: string;
}

const Newsletter: React.FC<Props> = ({ className = '' }) => {
  return (
    <div className={`${styles.newsletter} ${className}`}>
      <p className={styles.text}>Do you want promotions and news about us?</p>
      <span className={styles.title}>SUBSCRIBE TO OUR NEWSLETTER</span>
      <OutlinedInput
        className={styles.input}
        placeholder="Enter your email"
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <Icon>send</Icon>
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
};

export default Newsletter;

import { Button } from '@mui/material';
import Newsletter from '../Newsletter/Newsletter';
import styles from './GoToMenu.module.scss';

const GoToMenu: React.FC = () => {
  return (
    <div className={styles.menu}>
      <div>
        <p>Can’t find what you’re looking for?</p>
        <p className={styles.title}>Check the rest of the menu</p>
      </div>
      <Button variant="outlined" color="inherit">
        Go to the menu
      </Button>
      <Newsletter className={styles.newsletter} />
    </div>
  );
};

export default GoToMenu;

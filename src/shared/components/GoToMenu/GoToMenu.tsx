import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Newsletter from '../Newsletter/Newsletter';
import styles from './GoToMenu.module.scss';

const GoToMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.menu}>
      <div className={styles.wrapper}>
        <p>Can’t find what you’re looking for?</p>
      </div>
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => navigate('/menu')}
      >
        Go to the menu
      </Button>
      <Newsletter className={styles.newsletter} />
    </div>
  );
};

export default GoToMenu;

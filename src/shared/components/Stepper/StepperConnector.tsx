import { StepConnector } from '@mui/material';
import styles from './Stepper.module.scss';

const StepperConnector: React.FC = () => {
  return <StepConnector className={styles.connector} />;
};

export default StepperConnector;

import { Icon, StepIconProps } from '@mui/material';
import styles from './Stepper.module.scss';

interface Props extends StepIconProps {
  icon: string;
}

const StepperIcon: React.FC<Props> = ({ icon, active, completed }) => {
  const classes = `${styles.icon} ${
    active || completed ? styles['icon--active'] : ''
  }`;

  return (
    <div className={classes}>
      <Icon>{icon}</Icon>
    </div>
  );
};

export default StepperIcon;

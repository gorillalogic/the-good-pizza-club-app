import { Step, StepLabel } from '@mui/material';
import MaterialStepper from '@mui/material/Stepper';
import styles from './Stepper.module.scss';
import StepperConnector from './StepperConnector';
import StepperIcon from './StepperIcon';

interface Props {
  className?: string;
  activeStep: number;
  orientation?: 'vertical' | 'horizontal';
  steps: { icon: string; label: string }[];
}

const Stepper: React.FC<Props> = ({
  steps,
  activeStep,
  orientation = 'horizontal',
  className = '',
}) => {
  return (
    <MaterialStepper
      alternativeLabel
      orientation={orientation}
      activeStep={activeStep}
      className={`${styles.stepper} ${className}`}
      connector={<StepperConnector />}
    >
      {steps.map((step) => (
        <Step key={step.label}>
          <StepLabel
            StepIconComponent={StepperIcon}
            StepIconProps={{ icon: step.icon }}
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </MaterialStepper>
  );
};

export default Stepper;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { usePaymentInputs } from 'react-payment-inputs';
import theme from '../../../../core/theme/theme';
import { CardTypes, Payment } from '../../../../models/Payment';
import styles from './CreatePaymentDialog.module.scss';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (payment: Partial<Payment>) => void;
}

interface FormValues {
  type: string;
  bank: string;
  number: string;
  name: string;
  expiration: string;
  securityCode: string;
}

const CreatePaymentDialog: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const form = useForm<FormValues>();
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();
  const cardType = form.watch('type');

  const isFormValid =
    cardType !== 'default' && !meta.error && form.formState.isValid;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    form.handleSubmit((values) => {
      onConfirm({
        type: values.type as CardTypes,
        name: values.name,
        securityCode: values.securityCode,
        number: values.number.replaceAll(' ', ''),
        expiration: values.expiration.replaceAll(' ', ''),
      });
    })();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={styles.dialog}
      fullScreen={fullScreen}
    >
      <DialogTitle>Add Payment Method</DialogTitle>
      <DialogContent className={styles.content}>
        <FormGroup>
          <Controller
            name="type"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup row {...field} value={field.value || ''}>
                <FormControlLabel
                  value={CardTypes.Credit}
                  control={<Radio />}
                  label="Credit"
                  onChange={field.onChange}
                />
                <FormControlLabel
                  value={CardTypes.Debit}
                  control={<Radio />}
                  label="Debit"
                />
              </RadioGroup>
            )}
          />
          {form.formState.errors.type && (
            <p className={styles.error}>Card type is required</p>
          )}
        </FormGroup>
        <FormGroup>
          <Controller
            name="number"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                placeholder="Card number"
                className={styles.input}
                inputProps={{
                  ...getCardNumberProps({
                    onChange: field.onChange,
                  }),
                }}
              />
            )}
          />
          {meta.touchedInputs.cardNumber && meta.erroredInputs.cardNumber && (
            <p className={styles.error}>{meta.erroredInputs.cardNumber}</p>
          )}
        </FormGroup>
        <FormGroup>
          <TextField
            placeholder="Name on card"
            className={styles.input}
            {...form.register('name', { required: true })}
          />
          {form.formState.errors.name && (
            <p className={styles.error}>Name on card is required</p>
          )}
        </FormGroup>
        <FormGroup>
          <Grid container spacing={2}>
            <Grid item>
              <FormControl>
                <Controller
                  name="expiration"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      className={styles.input}
                      placeholder="Expiration date"
                      inputProps={{
                        ...getExpiryDateProps({
                          onChange: field.onChange,
                        }),
                      }}
                    />
                  )}
                />
                {meta.touchedInputs.expiryDate &&
                  meta.erroredInputs.expiryDate && (
                    <p className={styles.error}>
                      {meta.erroredInputs.expiryDate}
                    </p>
                  )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <Controller
                  name="securityCode"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      className={styles.input}
                      placeholder="Securty Code"
                      inputProps={{
                        ...getCVCProps({ onChange: field.onChange }),
                      }}
                    />
                  )}
                />
                {meta.touchedInputs.cvc && meta.erroredInputs.cvc && (
                  <p className={styles.error}>{meta.erroredInputs.cvc}</p>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </FormGroup>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePaymentDialog;

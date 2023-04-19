import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../core/hooks/useAppDispatch';
import { fetchRecords as fetchRecordsAction } from '../../../core/store/slices/records/asyncThunks';
import { recordsSelector } from '../../../core/store/slices/records/selectors';
import { HttpError } from '../../../models/Error';
import { RecordTypes } from '../../constants/global.constants';
import Additions from './Additions/Additions';
import styles from './CustomizeDialog.module.scss';
import {
  initialState,
  selectedElementsReducer,
  SelectedElementsState,
} from './selected-elements.reducer';
import Sizes from './Sizes/Sizes';
import Toppings from './Toppings/Toppings';

interface Props {
  open: boolean;
  sizesOnly?: boolean;
  onClose: () => void;
  onConfirm: (state: SelectedElementsState) => void;
}

const CustomizeDialog: React.FC<Props> = ({
  open,
  sizesOnly,
  onClose,
  onConfirm,
}) => {
  const theme = useTheme();
  const reduxDispatch = useAppDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [state, dispatch] = useReducer(selectedElementsReducer, initialState);
  const records = useSelector(recordsSelector);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<HttpError>();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        await reduxDispatch(fetchRecordsAction()).unwrap();
      } catch (error) {
        setError(error as HttpError);
      } finally {
        setLoading(false);
      }
    };

    if (open && !records.length) {
      fetchRecords();
    }
  }, [open, records]);

  const confirmHandler = () => {
    onConfirm(state);
    dispatch({ type: 'restart' });
  };

  let content: React.ReactNode;

  if (!records.length) {
    content = null;
  }

  if (records.length && sizesOnly) {
    content = (
      <Sizes
        sizes={records.filter((r) => r.type === RecordTypes.Size)}
        selectedSize={state.selectedSize}
        onSelect={(size) => dispatch({ type: size.type, payload: size })}
      />
    );
  }

  if (records.length && !sizesOnly) {
    content = (
      <>
        <Sizes
          sizes={records.filter((r) => r.type === RecordTypes.Size)}
          selectedSize={state.selectedSize}
          onSelect={(size) => dispatch({ type: size.type, payload: size })}
        />
        <Toppings
          sauces={records.filter((r) => r.type === RecordTypes.Sauce)}
          cheeses={records.filter((r) => r.type === RecordTypes.Cheese)}
          toppings={records.filter((r) => r.type === RecordTypes.Topping)}
          selectedSauce={state.selectedSauce}
          selectedCheese={state.selectedCheese}
          selectedToppings={state.selectedToppings}
          onChange={(type, item) => dispatch({ type, payload: item })}
        />
        <Additions
          drinks={records.filter((r) => r.type === RecordTypes.Drink)}
          salads={records.filter((r) => r.type === RecordTypes.Salad)}
          appetizers={records.filter((r) => r.type === RecordTypes.Appetizer)}
          desserts={records.filter((r) => r.type === RecordTypes.Dessert)}
          selectedItems={state.selectedAdditions}
          onChange={(item, quantity) =>
            dispatch({
              type: 'addition',
              payload: { ...item, quantity },
            })
          }
        />
      </>
    );
  }

  return (
    <Dialog
      className={styles.dialog}
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
    >
      <DialogTitle>
        <div className={styles.title}>
          <IconButton onClick={onClose} className={styles.close}>
            <Icon>close</Icon>
          </IconButton>
          <h2>Make it your own way</h2>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={styles.content}>
          {error && <p className={styles.error}>Error loading data...</p>}
          {loading && (
            <CircularProgress
              data-testid="customize-dialog-loader"
              color="primary"
            />
          )}
          {!loading && !error && content}
        </div>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => dispatch({ type: 'restart' })}
        >
          Restart
        </Button>
        <Button
          data-testid="customize-dialog-add-button"
          variant="contained"
          color="error"
          onClick={confirmHandler}
          disabled={state.selectedSize === undefined}
        >
          Add to cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomizeDialog;

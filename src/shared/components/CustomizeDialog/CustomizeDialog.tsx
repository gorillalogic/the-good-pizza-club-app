import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useReducer } from 'react';
import {
  APPETIZERS,
  CHEESES,
  DESSERTS,
  DRINKS,
  SALADS,
  SAUCES,
  SIZES,
  TOPPINGS,
} from '../../../mocks/customize';
import Additions from './Additions/Additions';
import styles from './CustomizeDialog.module.scss';
import {
  initialState,
  selectedElementsReducer,
} from './selected-elements.reducer';
import Sizes from './Sizes/Sizes';
import Toppings from './Toppings/Toppings';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

const CustomizeDialog: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [state, dispatch] = useReducer(selectedElementsReducer, initialState);

  return (
    <Dialog
      className={styles.dialog}
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
    >
      <DialogTitle className={styles.title}>Make it your own way</DialogTitle>
      <DialogContent className={styles.content}>
        <Sizes
          sizes={SIZES}
          selectedSize={state.selectedSize}
          onSelect={(size) =>
            dispatch({ type: size.type, payload: { id: size.id } })
          }
        />
        <Toppings
          sauces={SAUCES}
          cheeses={CHEESES}
          toppings={TOPPINGS}
          selectedSauce={state.selectedSauce}
          selectedCheese={state.selectedCheese}
          selectedToppings={state.selectedToppings}
          onChange={(item) =>
            dispatch({ type: item.type, payload: { id: item.id } })
          }
        />
        <Additions
          drinks={DRINKS}
          salads={SALADS}
          appetizers={APPETIZERS}
          desserts={DESSERTS}
          selectedItems={state.selectedAdditions}
          onChange={(item, quantity) =>
            dispatch({
              type: 'addition',
              payload: { ...item, quantity },
            })
          }
        />
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => dispatch({ type: 'restart' })}
        >
          Restart
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Add to cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomizeDialog;

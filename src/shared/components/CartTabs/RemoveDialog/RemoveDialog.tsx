import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import styles from './RemoveDialog.module.scss';

interface Props {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const RemoveDialog: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} className={styles.dialog}>
      <DialogTitle>Remove Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove this item from your cart?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveDialog;

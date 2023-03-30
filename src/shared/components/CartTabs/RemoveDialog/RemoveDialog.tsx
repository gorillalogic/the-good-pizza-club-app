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
  title: string;
  content: string;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const RemoveDialog: React.FC<Props> = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} className={styles.dialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
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

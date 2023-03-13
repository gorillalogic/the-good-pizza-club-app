import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import CustomizeDialog from '../../shared/components/CustomizeDialog/CustomizeDialog';

const CustomizeDialogCtx = createContext({
  openDialog: () => {
    //
  },
  closeDialog: () => {
    //
  },
});

const CustomizeDialogProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);
  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);
  const confirmHandler = useCallback(() => {
    // TODO
  }, []);

  return (
    <CustomizeDialogCtx.Provider value={{ openDialog, closeDialog }}>
      <>
        <CustomizeDialog
          open={open}
          onClose={closeDialog}
          onConfirm={confirmHandler}
        />
        {children}
      </>
    </CustomizeDialogCtx.Provider>
  );
};

export default CustomizeDialogCtx;
export { CustomizeDialogProvider };

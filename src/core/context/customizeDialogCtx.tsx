import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { CartItem } from '../../models/Cart';
import { Product } from '../../models/Product';
import CustomizeDialog from '../../shared/components/CustomizeDialog/CustomizeDialog';
import { SelectedElementsState } from '../../shared/components/CustomizeDialog/selected-elements.reducer';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addProduct } from '../store/slices/cart';

interface DialogOptions {
  sizesOnly?: boolean;
  product?: Product;
}

const CustomizeDialogCtx = createContext({
  openDialog: (options?: DialogOptions) => {
    //
  },
  closeDialog: () => {
    //
  },
});

const CustomizeDialogProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [sizesOnly, setSizesOnly] = useState(false);

  let product: Product | undefined;

  const openDialog = useCallback((options?: DialogOptions) => {
    setOpen(true);
    setSizesOnly(!!options?.sizesOnly);
    product = options?.product;
  }, []);
  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);
  const confirmHandler = useCallback(
    (state: SelectedElementsState) => {
      if (!state.selectedSize) return;

      const cartItem: CartItem = {
        id: Date.now(),
        size: state.selectedSize,
        quantity: 1,
      };

      if (product) {
        cartItem.product = product;
      } else {
        const items = [];
        state.selectedSauce && items.push(state.selectedSauce);
        state.selectedCheese && items.push(state.selectedCheese);
        cartItem.items = [...items, ...state.selectedToppings];
        cartItem.extras = state.selectedAdditions;
      }

      dispatch(addProduct(cartItem));
      setOpen(false);
    },
    [product]
  );

  return (
    <CustomizeDialogCtx.Provider value={{ openDialog, closeDialog }}>
      <>
        <CustomizeDialog
          open={open}
          sizesOnly={sizesOnly}
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

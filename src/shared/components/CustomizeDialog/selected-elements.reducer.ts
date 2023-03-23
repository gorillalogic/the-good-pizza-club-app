import { QuantifiedRecord, Record } from '../../../models/Record';

export interface SelectedElementsState {
  selectedSize: Record | undefined;
  selectedCheese: Record | undefined;
  selectedSauce: Record | undefined;
  selectedToppings: Record[];
  selectedAdditions: QuantifiedRecord[];
}

export interface SelectedElementsAction {
  type: string;
  payload?: Record | QuantifiedRecord;
}

export const initialState: SelectedElementsState = {
  selectedSize: undefined,
  selectedCheese: undefined,
  selectedSauce: undefined,
  selectedToppings: [],
  selectedAdditions: [],
};

export const selectedElementsReducer = (
  state: SelectedElementsState,
  action: SelectedElementsAction
) => {
  switch (action.type) {
    case 'size': {
      return {
        ...state,
        selectedSize: action.payload,
      };
    }
    case 'cheese': {
      return {
        ...state,
        selectedCheese: action.payload,
      };
    }
    case 'sauce': {
      return {
        ...state,
        selectedSauce: action.payload,
      };
    }
    case 'topping': {
      const newTopping = action.payload as Record;

      const index = state.selectedToppings.findIndex(
        (i) => i.id === newTopping.id
      );

      if (index !== -1) {
        return {
          ...state,
          selectedToppings: state.selectedToppings.filter(
            (i) => i.id !== newTopping.id
          ),
        };
      }

      return {
        ...state,
        selectedToppings: [...state.selectedToppings, newTopping],
      };
    }
    case 'addition': {
      const newAddition = action.payload as QuantifiedRecord;

      const itemIndex = state.selectedAdditions.findIndex(
        (item) =>
          item.type === action.payload?.type && item.id === action.payload?.id
      );

      if (itemIndex !== -1) {
        const newAdditions = [...state.selectedAdditions];

        if (newAddition.quantity === 0) {
          newAdditions.splice(itemIndex, 1);
        } else {
          newAdditions[itemIndex].quantity = newAddition.quantity;
        }

        return {
          ...state,
          selectedAdditions: newAdditions,
        };
      }

      return {
        ...state,
        selectedAdditions: [...state.selectedAdditions, newAddition],
      };
    }
    case 'restart': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

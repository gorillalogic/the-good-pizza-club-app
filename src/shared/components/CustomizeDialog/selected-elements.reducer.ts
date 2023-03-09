import { IdTypedObject } from '../../../models/Base';

export interface SelectedAddition extends IdTypedObject {
  quantity: number;
}

export interface SelectedElementsState {
  selectedSize: number | undefined;
  selectedCheese: number | undefined;
  selectedSauce: number | undefined;
  selectedToppings: number[];
  selectedAdditions: SelectedAddition[];
}

export interface SelectedElementsAction {
  type: string;
  payload?: {
    id?: number;
    name?: string;
    type?: string;
    quantity?: number;
  };
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
        selectedSize: action.payload?.id,
      };
    }
    case 'cheese': {
      return {
        ...state,
        selectedCheese: action.payload?.id,
      };
    }
    case 'sauce': {
      return {
        ...state,
        selectedSauce: action.payload?.id,
      };
    }
    case 'topping': {
      if (action.payload?.id === undefined) {
        return { ...state, selectedToppings: [] };
      }

      if (state.selectedToppings.includes(action.payload.id)) {
        return {
          ...state,
          selectedToppings: state.selectedToppings.filter(
            (id: number) => id !== action.payload?.id
          ),
        };
      }

      return {
        ...state,
        selectedToppings: [...state.selectedToppings, action.payload.id],
      };
    }
    case 'addition': {
      if (
        action.payload?.id === undefined ||
        action.payload.quantity === undefined ||
        !action.payload.name ||
        !action.payload.type
      ) {
        return { ...state, selectedAdditions: [] };
      }

      const itemIndex = state.selectedAdditions.findIndex(
        (item) =>
          item.type === action.payload?.type && item.id === action.payload?.id
      );

      if (itemIndex !== -1) {
        const newAdditions = [...state.selectedAdditions];

        if (action.payload.quantity === 0) {
          newAdditions.splice(itemIndex, 1);
        } else {
          newAdditions[itemIndex].quantity = action.payload.quantity;
        }

        return {
          ...state,
          selectedAdditions: newAdditions,
        };
      }

      return {
        ...state,
        selectedAdditions: [
          ...state.selectedAdditions,
          {
            id: action.payload.id,
            name: action.payload.name,
            type: action.payload.type,
            quantity: action.payload.quantity,
          },
        ],
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

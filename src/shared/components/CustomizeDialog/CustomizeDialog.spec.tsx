import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MOCK_RECORDS } from '../../../mocks/records';
import { renderWithStore, setupHttpMocks } from '../../utils/test';
import CustomizeDialog from './CustomizeDialog';
import { initialState } from './selected-elements.reducer';

describe('CustomizeDialogComponent', () => {
  const onCloseStub = jest.fn();
  const onConfirmStub = jest.fn();

  describe('success flow', () => {
    const handlers = [
      rest.get('/records', (_, res, ctx) => res(ctx.json(MOCK_RECORDS))),
    ];

    setupHttpMocks(handlers);
    describe('render all', () => {
      beforeEach(async () => {
        renderWithStore(
          <CustomizeDialog
            open={true}
            onClose={onCloseStub}
            onConfirm={onConfirmStub}
          />
        );

        await waitForElementToBeRemoved(
          screen.getByTestId('customize-dialog-loader')
        );
      });

      it('should render Sizes, Toppings and Additions', () => {
        const sizes = screen.getByTestId('customize-dialog-sizes');
        const toppings = screen.getByTestId('customize-dialog-toppings');
        const additions = screen.getByTestId('customize-dialog-additions');

        expect(sizes).toBeInTheDocument();
        expect(toppings).toBeInTheDocument();
        expect(additions).toBeInTheDocument();
      });
    });

    describe('render only sizes', () => {
      beforeEach(async () => {
        renderWithStore(
          <CustomizeDialog
            open={true}
            onClose={onCloseStub}
            onConfirm={onConfirmStub}
            sizesOnly
          />
        );

        await waitForElementToBeRemoved(
          screen.getByTestId('customize-dialog-loader')
        );
      });

      it('should render only Sizes component', () => {
        const sizes = screen.getByTestId('customize-dialog-sizes');
        expect(sizes).toBeInTheDocument();
      });
    });

    describe('user selections', () => {
      beforeEach(async () => {
        renderWithStore(
          <CustomizeDialog
            open={true}
            onClose={onCloseStub}
            onConfirm={onConfirmStub}
          />
        );

        await waitForElementToBeRemoved(
          screen.getByTestId('customize-dialog-loader')
        );
      });

      it('should call onConfirm with selected size', async () => {
        const [size] = screen.getAllByTestId('customize-dialog-size');

        userEvent.click(size);

        const addButton = screen.getByTestId('customize-dialog-add-button');

        await waitFor(() => {
          expect(addButton.getAttribute('disabled')).toBe(null);
        });

        userEvent.click(addButton);

        await waitFor(() => {
          expect(onConfirmStub).toHaveBeenCalledWith({
            ...initialState,
            selectedSize: MOCK_RECORDS[0],
          });
        });
      });

      it('should call onConfirm with selected toppings', async () => {
        const [size] = screen.getAllByTestId('customize-dialog-size');
        const [sauces, cheeses, toppings] = screen.getAllByTestId(
          'customize-dialog-topping-group'
        );
        const [sauce] = Array.from(sauces.querySelectorAll('button'));
        const [cheese] = Array.from(cheeses.querySelectorAll('button'));
        const [topping] = Array.from(toppings.querySelectorAll('button'));

        userEvent.click(size);
        userEvent.click(sauce);
        userEvent.click(cheese);
        userEvent.click(topping);

        const addButton = screen.getByTestId('customize-dialog-add-button');

        await waitFor(() => {
          expect(addButton.getAttribute('disabled')).toBe(null);
        });

        userEvent.click(addButton);

        await waitFor(() => {
          expect(onConfirmStub).toHaveBeenCalledWith({
            ...initialState,
            selectedSize: MOCK_RECORDS[0],
            selectedSauce: MOCK_RECORDS[3],
            selectedCheese: MOCK_RECORDS[6],
            selectedToppings: [MOCK_RECORDS[11]],
          });
        });
      });

      it('should call onConfirm with selected additions', async () => {
        const [size] = screen.getAllByTestId('customize-dialog-size');
        const [itemSelect, quantitySelect] = screen.getAllByRole('select');

        userEvent.click(size);
        // click button inside element with role select
        userEvent.click(within(itemSelect).getByRole('button'));

        // find and click the second element within the listbox. First one is disabled
        const itemsListBox = await screen.findByRole('listbox');
        const [, itemOption] = await within(itemsListBox).findAllByRole(
          'option'
        );
        userEvent.click(itemOption);

        // click button inside element with role select
        userEvent.click(within(quantitySelect).getByRole('button'));

        // find and click the second element within the listbox. First one is disabled
        const quantityListBox = await screen.findByRole('listbox');
        const [, quantityOption] = await within(quantityListBox).findAllByRole(
          'option'
        );
        userEvent.click(quantityOption);

        // find and click addition add button
        const [additionGroup] = screen.getAllByTestId(
          'customize-dialog-addition-group'
        );
        const addAdditionButton = within(additionGroup).getByText(/add/i);
        userEvent.click(addAdditionButton);

        // click the add to cart button
        const addToCartButton = screen.getByTestId(
          'customize-dialog-add-button'
        );

        // wait until disabled attr is removed from add to cart button
        await waitFor(() => {
          expect(addToCartButton.getAttribute('disabled')).toBe(null);
        });

        userEvent.click(addToCartButton);

        await waitFor(() => {
          expect(onConfirmStub).toHaveBeenCalledWith({
            ...initialState,
            selectedSize: MOCK_RECORDS[0],
            selectedAdditions: [{ ...MOCK_RECORDS[24], quantity: 1 }],
          });
        });
      });
    });
  });

  describe('error flow', () => {
    const handlers = [
      rest.get('/records', (_, res, ctx) => res(ctx.status(500))),
    ];

    setupHttpMocks(handlers);

    beforeEach(async () => {
      renderWithStore(
        <CustomizeDialog
          open={true}
          onClose={onCloseStub}
          onConfirm={onConfirmStub}
        />
      );
    });

    it('should render error element', async () => {
      const error = await screen.findByText(/error loading data/i);
      expect(error).toBeInTheDocument();
    });
  });
});

import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MOCK_PAYMENTS } from '../../../../mocks/payments';
import CreatePaymentDialog from './CreatePaymentDialog';

describe('CreatePaymentDialog', () => {
  const onCloseStub = jest.fn();
  const onConfirmStub = jest.fn();

  beforeEach(async () => {
    onCloseStub.mockReset();
    onConfirmStub.mockReset();

    render(
      <CreatePaymentDialog
        open={true}
        onClose={onCloseStub}
        onConfirm={onConfirmStub}
      />
    );
  });

  it('should render Create Paymeny Dialog', () => {
    const dialog = screen.getByTestId('create-payment-dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should call onClose prop', async () => {
    const closeButton = screen.getByText(/Cancel/);

    userEvent.click(closeButton);

    await waitFor(() => {
      expect(onCloseStub).toHaveBeenCalled();
    });
  });

  it('should call onConfirm prop', async () => {
    const testPaymentData = MOCK_PAYMENTS[0];
    const submitButton = screen.getByText(/Save/);
    const [firstRadio] = screen.getAllByRole('radio');
    const inputElements = screen.getAllByRole('input');

    await act(() => {
      userEvent.click(firstRadio);
      userEvent.type(inputElements[0], testPaymentData.number);
      userEvent.type(inputElements[1], testPaymentData.name);
      userEvent.type(inputElements[2], testPaymentData.expiration);
      userEvent.type(inputElements[3], testPaymentData.securityCode);
    });

    await act(() => {
      userEvent.click(submitButton);
    });

    expect(onConfirmStub).toHaveBeenCalled();
  });
});

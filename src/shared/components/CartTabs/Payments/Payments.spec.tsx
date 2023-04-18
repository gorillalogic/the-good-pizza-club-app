import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MOCK_PAYMENTS } from '../../../../mocks/payments';
import { renderWithStore, setupHttpMocks } from '../../../utils/test';
import Payments from './Payments';

describe('PaymentsComponent', () => {
  const onSelectStub = jest.fn();
  const handlers = [
    rest.post('/users/payment', (_, res, ctx) => res(ctx.status(201))),
    rest.delete('/users/payment/:id', (_, res, ctx) => res(ctx.status(200))),
  ];

  setupHttpMocks(handlers);

  beforeEach(() => {
    onSelectStub.mockReset();

    renderWithStore(
      <Payments
        payments={MOCK_PAYMENTS}
        selectedPayment={null}
        onSelect={onSelectStub}
      />
    );
  });

  it('should render Payments component', () => {
    const payments = screen.getByTestId('payments');
    expect(payments).toBeInTheDocument();
  });

  it('should open create dialog and show snackbar after create', async () => {
    const createButton = screen.getByText(/new payment/i);
    userEvent.click(createButton);

    const dialog = await screen.findByTestId('create-payment-dialog');
    expect(dialog).toBeInTheDocument();

    const testPaymentData = MOCK_PAYMENTS[0];
    const [firstRadio] = screen.getAllByRole('radio');
    const inputElements = screen.getAllByRole('input');

    await waitFor(() => {
      userEvent.click(firstRadio);
      userEvent.type(inputElements[0], testPaymentData.number);
      userEvent.type(inputElements[1], testPaymentData.name);
      userEvent.type(inputElements[2], testPaymentData.expiration);
      userEvent.type(inputElements[3], testPaymentData.securityCode);
    });

    const submitButton = screen.getByText(/save/i);

    await waitFor(() => {
      userEvent.click(submitButton);
    });

    const snackbar = await screen.findByTestId('snackbar');
    expect(snackbar).toBeInTheDocument();
  });

  it('should open remove dialog and show snackbar after delete', async () => {
    const [card] = screen.getAllByTestId('payment-card');
    const [deleteButton] = Array.from(card.querySelectorAll('button'));

    await waitFor(() => {
      userEvent.click(deleteButton);
    });

    const dialog = await screen.findByTestId('remove-dialog');
    expect(dialog).toBeInTheDocument();

    const confirmButton = screen.getByText(/remove/i);

    await waitFor(() => {
      userEvent.click(confirmButton);
    });

    const snackbar = await screen.findByTestId('snackbar');
    expect(snackbar).toBeInTheDocument();
  });
});

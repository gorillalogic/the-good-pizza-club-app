import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MOCK_ADDRESSES } from '../../../../mocks/addresses';
import { MOCK_GEOLOCATION } from '../../../../mocks/geolocation';
import { MOCK_GOOGLE_MAPS } from '../../../../mocks/maps';
import { renderWithStore, setupHttpMocks } from '../../../utils/test';
import Addresses from './Addresses';

global.google = MOCK_GOOGLE_MAPS;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global.navigator as any).geolocation = MOCK_GEOLOCATION;

describe('AddressesComponent', () => {
  const onSelectStub = jest.fn();
  const handlers = [
    rest.post('/users/address', (_, res, ctx) => res(ctx.status(201))),
    rest.delete('/users/address/:id', (_, res, ctx) => res(ctx.status(200))),
  ];

  setupHttpMocks(handlers);

  beforeEach(() => {
    onSelectStub.mockReset();

    renderWithStore(
      <Addresses
        addresses={MOCK_ADDRESSES}
        selectedAddress={null}
        onSelect={onSelectStub}
      />
    );
  });

  it('should render Addresses componet', () => {
    const addresses = screen.getByTestId('addresses');
    expect(addresses).toBeInTheDocument();
  });

  it('should open create dialog and show snackbar after create', async () => {
    const createButton = screen.getByText(/new address/i);
    userEvent.click(createButton);

    const dialog = await screen.findByTestId('create-address-dialog');
    expect(dialog).toBeInTheDocument();

    const useCurrentButton = screen.getByText(/Use my current location/);
    userEvent.click(useCurrentButton);

    const inputEl = await screen.findByRole('input');
    userEvent.type(inputEl, 'test direcction');

    const submitButton = screen.getByText(/save/i);

    await waitFor(() => {
      userEvent.click(submitButton);
    });

    const snackbar = await screen.findByTestId('snackbar');
    expect(snackbar).toBeInTheDocument();
  });

  it('should open remove dialog and show snackbar after delete', async () => {
    const [card] = screen.getAllByTestId('address-card');
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

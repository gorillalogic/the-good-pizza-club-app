import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MOCK_GEOLOCATION } from '../../../../mocks/geolocation';
import { MOCK_GOOGLE_MAPS } from '../../../../mocks/maps';
import CreateAddressDialog from './CreateAddressDialog';

global.google = MOCK_GOOGLE_MAPS;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global.navigator as any).geolocation = MOCK_GEOLOCATION;

describe('CreateAddressDialog', () => {
  const onCloseStub = jest.fn();
  const onConfirmStub = jest.fn();

  beforeEach(async () => {
    onCloseStub.mockReset();
    onConfirmStub.mockReset();

    render(
      <CreateAddressDialog
        open={true}
        onClose={onCloseStub}
        onConfirm={onConfirmStub}
      />
    );
  });

  it('should render Create Address Dialog', () => {
    const dialog = screen.getByTestId('create-address-dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should render map with current location', async () => {
    const useCurrentButton = screen.getByText(/Use my current location/);

    userEvent.click(useCurrentButton);

    const map = await screen.findByTestId('map');
    expect(map).toBeInTheDocument();
  });

  it('should call onClose prop', async () => {
    const closeButton = screen.getByText(/Cancel/);

    userEvent.click(closeButton);

    await waitFor(() => {
      expect(onCloseStub).toHaveBeenCalled();
    });
  });

  it('should call onConfirm prop', async () => {
    const submitButton = screen.getByText(/Save/);
    const useCurrentButton = screen.getByText(/Use my current location/);
    userEvent.click(useCurrentButton);
    const inputEl = await screen.findByRole('input');

    userEvent.type(inputEl, 'Test direction');

    await waitFor(() => {
      userEvent.click(submitButton);
      expect(onConfirmStub).toHaveBeenCalled();
    });
  });
});

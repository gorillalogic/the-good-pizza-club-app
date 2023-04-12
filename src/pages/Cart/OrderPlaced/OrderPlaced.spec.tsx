import { act, screen } from '@testing-library/react';
import { MOCK_AUTH } from '../../../mocks/auth';
import { renderWithProviders } from '../../../shared/utils/test';

describe('OrderPlacedPage', () => {
  beforeEach(async () => {
    renderWithProviders({
      route: '/cart/order-placed',
      preloadedState: {
        auth: MOCK_AUTH,
      },
    });

    await act(() => Promise.resolve());
  });

  it('should render Order Placed page', () => {
    const title = screen.getByText('Your order has been completed!');
    expect(title).toBeInTheDocument();
  });
});

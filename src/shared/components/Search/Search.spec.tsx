import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('SearchComponent', () => {
  const onSearchStub = jest.fn();

  beforeEach(() => {
    render(<Search onSearch={onSearchStub} />);
  });

  it('should render Search component', () => {
    const search = screen.getByTestId('search-input');
    expect(search).toBeInTheDocument();
  });

  it('should call onSearch prop', async () => {
    const search = screen.getByTestId('search-input');

    userEvent.type(search, '123');

    await waitFor(() => {
      expect(onSearchStub).toHaveBeenCalledWith('123');
    });
  });
});

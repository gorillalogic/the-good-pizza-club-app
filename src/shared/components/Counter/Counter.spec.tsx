import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('CounterComponent', () => {
  const onChangeStub = jest.fn();

  beforeEach(() => {
    render(<Counter onChange={onChangeStub} />);
  });

  it('should render Counter component', () => {
    const counter = screen.getByTestId('counter');
    expect(counter).toBeInTheDocument();
  });

  it('should call onChange prop with new value on add and substract clicks', async () => {
    const [substractButton, addButton] = screen.getAllByRole('button');

    userEvent.click(addButton);

    await waitFor(() => {
      expect(onChangeStub).toHaveBeenCalledWith(1);
    });

    userEvent.click(substractButton);

    await waitFor(() => {
      expect(onChangeStub).toHaveBeenCalledWith(0);
    });
  });
});

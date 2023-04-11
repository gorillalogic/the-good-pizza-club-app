import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFoundPage', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('should render NotFound page', () => {
    const title = screen.getByText('404 Not Found');
    expect(title).toBeInTheDocument();
  });
});

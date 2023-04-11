import { render, screen } from '@testing-library/react';
import Contact from './Contact';

describe('ContactPage', () => {
  beforeEach(() => {
    render(<Contact />);
  });

  it('should render NotFound page', () => {
    const title = screen.getByText('Contact');
    const form = screen.getByRole('form');

    expect(title).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });
});

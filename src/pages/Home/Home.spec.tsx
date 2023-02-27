import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('HomeComponent', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('should render Welcome title', () => {
    const result = screen.getByText('Welcome!', { exact: false });
    expect(result).toBeDefined();
  });
});

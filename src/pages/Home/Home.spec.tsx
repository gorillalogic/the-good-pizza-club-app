import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('HomeComponent', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('should render background images', () => {
    const result = screen.getAllByRole('img');
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });
});

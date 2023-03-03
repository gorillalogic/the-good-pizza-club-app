import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('LoginComponent', () => {
  beforeEach(() => {
    render(<Login />);
  });

  it('should render background images', () => {
    const result = screen.getAllByRole('img');
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });
});

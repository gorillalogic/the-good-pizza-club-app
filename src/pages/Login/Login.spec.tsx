import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('LoginPage', () => {
  beforeEach(() => {
    render(<Login />);
  });

  it('should render background images', () => {
    const result = screen.getAllByRole('img');
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should render content div', () => {
    const result = screen.getByTestId('page-content');
    expect(result).toBeDefined();
  });
});

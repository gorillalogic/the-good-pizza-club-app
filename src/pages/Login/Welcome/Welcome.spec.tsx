import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../shared/utils/test';

describe('WelcomePage', () => {
  it('should render Welcome page', () => {
    renderWithProviders();

    const title = screen.getByText('WELCOME!');
    const subtitle = screen.getByText('Make yourself at home');
    const loginButton = screen.getByText('Log In');
    const signUpButton = screen.getByText('Sign Up');

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  it('should navigate to home page if user is logged in', () => {
    renderWithProviders({
      preloadedState: {
        auth: {
          isLoggedIn: true,
          user: null,
        },
      },
    });

    const title = screen.getByText('Pizza?');
    expect(title).toBeInTheDocument();
  });
});

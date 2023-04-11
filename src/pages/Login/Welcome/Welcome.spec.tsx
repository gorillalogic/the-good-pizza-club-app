import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../shared/utils/test';
import Welcome from './Welcome';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('WelcomePage', () => {
  it('should render Welcome page', () => {
    renderWithProviders(<Welcome />);

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
    renderWithProviders(<Welcome />, {
      preloadedState: {
        auth: {
          isLoggedIn: true,
          user: null,
        },
      },
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/home', { replace: true });
  });
});

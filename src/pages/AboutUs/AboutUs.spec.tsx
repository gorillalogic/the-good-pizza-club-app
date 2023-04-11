import { render, screen } from '@testing-library/react';
import AboutUs from './AboutUs';

describe('AboutUsPage', () => {
  beforeEach(() => {
    render(<AboutUs />);
  });

  it('should render NotFound page', () => {
    const title = screen.getByText('About Us');
    expect(title).toBeInTheDocument();
  });
});

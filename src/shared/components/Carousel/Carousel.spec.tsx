import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

const mockSlides = [
  <img key={0} src="/images/pizza1.png" />,
  <img key={1} src="/images/pizza2.png" />,
  <img key={2} src="/images/pizza3.png" />,
  <img key={3} src="/images/pizza4.png" />,
  <img key={4} src="/images/pizza5.png" />,
  <img key={5} src="/images/pizza6.png" />,
];

describe('CarouselComponent', () => {
  beforeEach(() => {
    render(<Carousel slides={mockSlides} />);
  });

  it('should render Carousel component', () => {
    const carousel = screen.getByTestId('carousel');
    expect(carousel).toBeInTheDocument();
  });
});

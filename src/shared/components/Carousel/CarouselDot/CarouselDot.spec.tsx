import { render, screen } from '@testing-library/react';
import CarouselDot from './CarouselDot';

describe('CarouselDotComponent', () => {
  const onClickStub = jest.fn();
  beforeEach(() => {
    onClickStub.mockReset();
  });

  it('should render Dot component', () => {
    render(<CarouselDot selected={false} onClick={onClickStub} />);

    const dot = screen.getByRole('button');
    expect(dot).toBeInTheDocument();
  });

  it('should add selected class to button if dot is selected', () => {
    render(<CarouselDot selected={true} onClick={onClickStub} />);

    const dot = screen.getByRole('button');
    expect(dot.classList.length).toEqual(2);
  });
});

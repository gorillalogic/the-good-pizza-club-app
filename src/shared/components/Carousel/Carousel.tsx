import { Icon } from '@mui/material';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import styles from './Carousel.module.scss';
import CarouselDot from './CarouselDot/CarouselDot';

interface Props {
  slides: React.ReactNode[];
  align?: 'start' | 'center' | 'end';
}

const Carousel: React.FC<Props> = ({ slides, align = 'start' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div data-testid="carousel" className={styles.carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((slide, index) => (
            <div key={index} className={styles.slide}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <button
        className={`${styles.button} ${styles['button--prev']}`}
        onClick={scrollPrev}
      >
        <Icon>arrow_back_ios</Icon>
      </button>
      <button
        className={`${styles.button} ${styles['button--next']}`}
        onClick={scrollNext}
      >
        <Icon>arrow_forward_ios</Icon>
      </button>
      <div className={styles.dots}>
        {scrollSnaps.map((_, index) => (
          <CarouselDot
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

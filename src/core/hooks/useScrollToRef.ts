const useScrollToRef = () => {
  const scrollTo = (ref: React.MutableRefObject<HTMLElement | null>) => {
    if (!ref) return;

    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  return {
    scrollTo,
  };
};

export default useScrollToRef;

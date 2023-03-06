import styles from './CarouselDot.module.scss';

interface Props {
  selected: boolean;
  onClick: () => void;
}

const CarouselDot: React.FC<Props> = ({ selected, onClick }) => {
  const classes = [styles.dot, selected ? styles.selected : ''].join(' ');

  return <button className={classes} type="button" onClick={onClick}></button>;
};

export default CarouselDot;

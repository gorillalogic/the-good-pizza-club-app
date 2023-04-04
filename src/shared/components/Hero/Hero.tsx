import { Icon, IconButton } from '@mui/material';
import useScrollToRef from '../../../core/hooks/useScrollToRef';
import styles from './Hero.module.scss';

interface Props extends React.PropsWithChildren {
  image?: string;
  refToScroll?: React.MutableRefObject<HTMLElement | null>;
}

const Hero: React.FC<Props> = ({ children, image, refToScroll }) => {
  const background = `url(${image})`;
  const { scrollTo } = useScrollToRef();

  const clickHandler = () => {
    if (refToScroll) {
      scrollTo(refToScroll);
    }
  };

  return (
    <div
      className={styles.hero}
      style={{ '--image': background } as React.CSSProperties}
    >
      {children}
      <IconButton className={styles.button} onClick={clickHandler}>
        <Icon>keyboard_arrow_down</Icon>
      </IconButton>
    </div>
  );
};

export default Hero;

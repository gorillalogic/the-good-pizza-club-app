import { Button } from '@mui/material';
import { BACKGROUND_IMAGES } from '../../shared/constants/global.constants';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const backgroundImages = {
    '--bgMobile': `url(${BACKGROUND_IMAGES.mobile})`,
    '--bgDesktop': `url(${BACKGROUND_IMAGES.desktop})`,
  } as React.CSSProperties;

  return (
    <section
      className={styles.home}
      style={backgroundImages}
    >
      <h1 className={styles.title}>WELCOME!</h1>
      <h2 className={styles.subtitle}>Make yourself at home</h2>
      <div className={styles.actions}>
        <Button variant='outlined'>Log In</Button>
        <Button variant='contained'>Sign Up</Button>
      </div>
    </section>
  );
};

export default Home;

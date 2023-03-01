import { Outlet } from 'react-router-dom';
import { BACKGROUND_IMAGES } from '../../shared/constants/global.constants';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <section className={styles.home}>
      <img
        src={BACKGROUND_IMAGES.desktop}
        alt=""
        className={`${styles.background} ${styles['background--desktop']}`}
      />
      <img
        src={BACKGROUND_IMAGES.mobile}
        alt=""
        className={`${styles.background} ${styles['background--mobile']}`}
      />
      <div className={styles.content}>
        <Outlet />
      </div>
    </section>
  );
};

export default Home;

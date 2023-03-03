import { Outlet } from 'react-router-dom';
import { BACKGROUND_IMAGES } from '../../shared/constants/global.constants';
import styles from './Login.module.scss';

const Welcome: React.FC = () => {
  return (
    <section className={styles.login}>
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

export default Welcome;

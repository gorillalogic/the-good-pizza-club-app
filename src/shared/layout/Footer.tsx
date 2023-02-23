import { Link } from 'react-router-dom';
import { SOCIAL_MEDIA_ITEMS } from '../constants/global.constants';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <img className={styles.logo} src="images/logo.svg" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            scelerisque vulputate est iaculis bibendum curabitur.
          </p>
          <div className={styles['social-media']}>
            {SOCIAL_MEDIA_ITEMS.map((item) => (
              <a key={item.name} href={item.url}>
                <img src={item.icon} alt={item.name} />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <h3>Our Links</h3>
          <Link to="/menu">Menu</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/help">Help</Link>
        </div>
        <div className={styles.column}>
          <h3>Important stuff!</h3>
          <Link to="/terms-&-conditions">Terms & Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/careers">Careers</Link>
        </div>
        <div className={styles.column}>
          <h3>Our Feed</h3>
          <div className={styles.images}>
            <img src="images/pizza1.png" alt="Imagen de Pizza" />
            <img src="images/pizza2.png" alt="Imagen de Pizza" />
            <img src="images/pizza3.png" alt="Imagen de Pizza" />
            <img src="images/pizza4.png" alt="Imagen de Pizza" />
            <img src="images/pizza5.png" alt="Imagen de Pizza" />
            <img src="images/pizza6.png" alt="Imagen de Pizza" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

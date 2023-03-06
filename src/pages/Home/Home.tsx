import { Button } from '@mui/material';
import Hero from '../../shared/components/Hero/Hero';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <section className={styles.home}>
      <Hero image="images/home_background.png">
        <h1 className={styles.title}>Pizza?</h1>
        <h2 className={styles.subtitle}>Gotcha!</h2>
        <Button className={styles.button} variant="contained" color="error">
          Customize Your Own
        </Button>
      </Hero>
      <section className={styles['home-section']}>
        <h3>Promotions of the day</h3>
      </section>
      <section className={styles['home-section']}>
        <h3>You can also try one of our greatest hits</h3>
      </section>
      <section className={styles['home-section']}></section>
    </section>
  );
};

export default Home;

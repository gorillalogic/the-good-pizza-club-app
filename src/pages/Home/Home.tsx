import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <section className={styles.home}>
      <h1 className={styles.home__title}>The Good Pizza Club!</h1>
    </section>
  );
};

export default Home;

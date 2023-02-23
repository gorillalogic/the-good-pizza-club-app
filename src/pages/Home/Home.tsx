import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <section className={styles.home}>
      <h1 className={styles.title}>WELCOME!</h1>
      <h2 className={styles.subtitle}>Make yourself at home</h2>
    </section>
  );
};

export default Home;

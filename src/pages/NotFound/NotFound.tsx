import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <section className={styles['not-found']}>
      <h1>404 Not Found</h1>
    </section>
  );
};

export default NotFound;

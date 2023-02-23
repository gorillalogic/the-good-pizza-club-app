import styles from './Layout.module.scss';
import Navbar from './Navbar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className={styles.layout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </section>
  );
};

export default Layout;

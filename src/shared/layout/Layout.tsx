import styles from './Layout.module.scss';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className={styles.layout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </section>
  );
};

export default Layout;

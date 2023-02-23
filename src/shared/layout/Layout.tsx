import styles from './Layout.module.scss';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className={styles.layout}>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </section>
  );
};

export default Layout;

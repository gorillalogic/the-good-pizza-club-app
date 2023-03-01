import styles from './Layout.module.scss';
import Footer from './Footer';
import Navbar from './Navbar';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSnackbar } from '../../core/store/slices/snackbar/selectors';
import { useEffect } from 'react';
import { hideSnackbar } from '../../core/store/slices/snackbar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isDisplay, color, message } = useSelector(getSnackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isDisplay) {
      timer = setTimeout(() => {
        dispatch(hideSnackbar());
      }, 3000);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [isDisplay]);

  return (
    <section className={styles.layout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Snackbar
        open={isDisplay}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={color} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Footer />
    </section>
  );
};

export default Layout;

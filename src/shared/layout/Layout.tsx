import { Alert, Snackbar } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '../../core/store/slices/snackbar';
import { getSnackbar } from '../../core/store/slices/snackbar/selectors';
import Footer from './Footer';
import styles from './Layout.module.scss';
import Navbar from './Navbar';

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
        data-testid="snackbar"
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

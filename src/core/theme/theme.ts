import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EB5757',
    },
    secondary: {
      main: '#27AE60',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '16px 32px',
          borderRadius: 200,
          minWidth: 224,
          fontWeight: 'bold'
        }
      }
    }
  }
});

export default theme;

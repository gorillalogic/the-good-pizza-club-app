import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F2994A',
    },
    secondary: {
      main: '#27AE60',
      contrastText: '#F2F2F2',
    },
    error: {
      main: '#EB5757',
    },
    warning: {
      main: '#F2C94C',
    },
    success: {
      main: '#27AE60',
    },
  },
  typography: {
    fontFamily: [
      'Rowdies',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '16px 32px',
          borderRadius: 200,
          minWidth: 224,
          fontWeight: 'bold',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            backgroundColor: '#F2F2F2',
            borderRadius: '10px',
          },
        },
      },
    },
  },
});

export default theme;

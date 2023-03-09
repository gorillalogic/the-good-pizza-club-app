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
  breakpoints: {
    values: {
      xs: 0,
      sm: 588,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
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
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#4F4F4F',
          color: '#f2f2f2',
        },
        icon: {
          backgroundColor: '#f2f2f2',
          borderRadius: '50%',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#333333',
          maxWidth: 700,
          ['@media (min-width:768px)']: {
            borderRadius: '10px 100px 10px 10px',
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#f2c94c',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: '#f2f2f2',
        },
      },
    },
  },
});

export default theme;

import { createTheme } from '@mui/material';

export const purpleTheme = createTheme({
  typography: {
    fontFamily: 'Canaro, sans-serif',
  },
  palette: {
    primary: {
      main: '#0F205F',
    },
    secondary: {
      main: '#543884',
    },
    error: {
      main: '#DC3545',
    },
  },
});

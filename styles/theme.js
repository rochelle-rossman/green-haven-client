import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, serif',
  },
  palette: {
    primary: {
      main: '#9ccc65',
    },
    secondary: {
      main: '#43a047',
    },
  },
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            fontSize: '0.8rem',
          },
        },
      },
    },
    formControlLabel: {
      fontSize: '0.5rem',
      '& .MuiTypography-root': {
        fontSize: '0.5rem',
      },
    },
  },
});

export default theme;

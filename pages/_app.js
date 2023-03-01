/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { AuthProvider } from '../utils/context/authContext';
import { ProductTypeProvider } from '../utils/context/productTypeContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, serif',
  },
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {/* gives children components access to user and auth methods */}
        <ProductTypeProvider>
          <ViewDirectorBasedOnUserAuthStatus
            // if status is pending === loading
            // if status is logged in === view app
            // if status is logged out === sign in page
            component={Component}
            pageProps={pageProps}
          />
        </ProductTypeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;

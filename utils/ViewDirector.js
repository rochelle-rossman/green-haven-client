import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Navigation from '../components/Navigation';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { userLoading } = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  if (userLoading) {
    return <Loading />;
  }
  return (
    <>
      <Navigation onDrawerOpen={handleDrawerOpen} onDrawerClose={handleDrawerClose} />
      <div className={`container ${isDrawerOpen ? 'drawer-open' : ''}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

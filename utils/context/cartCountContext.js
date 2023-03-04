import { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './authContext';
import { getOpenOrdersByCustomer } from '../data/orderData';

const CartCountContext = createContext({
  cartCount: 0,
  setCartCount: () => {},
});

const CartCountProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const count = orders.reduce((acc, order) => acc + order.products.reduce((prodAcc, product) => prodAcc + product.quantity, 0), 0);
    setCartCount(count);
  }, [orders]);

  useEffect(() => {
    if (user) {
      getOpenOrdersByCustomer(user.id).then(setOrders);
    }
  }, [user]);

  return <CartCountContext.Provider value={{ cartCount, setCartCount }}>{children}</CartCountContext.Provider>;
};

CartCountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartCountContext, CartCountProvider };

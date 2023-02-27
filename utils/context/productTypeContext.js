import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const ProductTypeContext = createContext({
  productType: '',
  setProductType: () => {},
});

const ProductTypeProvider = ({ children }) => {
  const [productType, setProductType] = useState('');

  return <ProductTypeContext.Provider value={{ productType, setProductType }}>{children}</ProductTypeContext.Provider>;
};

ProductTypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProductTypeContext, ProductTypeProvider };

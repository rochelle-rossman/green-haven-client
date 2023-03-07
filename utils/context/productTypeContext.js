import { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const ProductTypeContext = createContext({
  productType: '',
  careLevel: '',
  lightLevel: '',
  waterNeeds: '',
  petFriendly: '',
  setProductType: () => {},
  setCareLevel: () => {},
  setLightLevel: () => {},
  setWaterNeeds: () => { },
  setPetFriendly: () => {},
});

const ProductTypeProvider = ({ children }) => {
  const [productType, setProductType] = useState('');
  const [careLevel, setCareLevel] = useState('');
  const [lightLevel, setLightLevel] = useState('');
  const [waterNeeds, setWaterNeeds] = useState('');
  const [petFriendly, setPetFriendly] = useState('');

  const value = useMemo(
    () => ({
      productType,
      setProductType,
      careLevel,
      setCareLevel,
      lightLevel,
      setLightLevel,
      waterNeeds,
      setWaterNeeds,
      petFriendly,
      setPetFriendly,
    }),
    [productType, setProductType, careLevel, setCareLevel, lightLevel, setLightLevel, waterNeeds, setWaterNeeds, petFriendly, setPetFriendly],
  );

  return (
    <ProductTypeContext.Provider value={value}>{children}
    </ProductTypeContext.Provider>
  );
};

ProductTypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProductTypeContext, ProductTypeProvider };

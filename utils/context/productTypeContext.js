import { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const ProductTypeContext = createContext({
  productType: '',
  careLevel: '',
  lightLevel: '',
  waterNeeds: '',
  petFriendly: '',
  designStyle: '',
  designRoom: '',
  decorStyle: '',
  setProductType: () => {},
  setCareLevel: () => {},
  setLightLevel: () => {},
  setWaterNeeds: () => { },
  setPetFriendly: () => { },
  setDesignStyle: () => { },
  setDesignRoom: () => { },
  setDecorStyle: () => { },
});

const ProductTypeProvider = ({ children }) => {
  const [productType, setProductType] = useState('');
  const [careLevel, setCareLevel] = useState('');
  const [lightLevel, setLightLevel] = useState('');
  const [waterNeeds, setWaterNeeds] = useState('');
  const [petFriendly, setPetFriendly] = useState('');
  const [designStyle, setDesignStyle] = useState('');
  const [designRoom, setDesignRoom] = useState('');
  const [decorStyle, setDecorStyle] = useState('');

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
      designStyle,
      setDesignStyle,
      designRoom,
      setDesignRoom,
      decorStyle,
      setDecorStyle,
    }),
    [productType, setProductType, careLevel, setCareLevel, lightLevel, setLightLevel, waterNeeds, setWaterNeeds, petFriendly, setPetFriendly, designStyle, setDesignStyle, designRoom, setDesignRoom, decorStyle, setDecorStyle],
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

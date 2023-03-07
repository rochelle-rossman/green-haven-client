/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { ProductTypeContext } from '../../utils/context/productTypeContext';
import ProductCard from '../../components/product/ProductCard';
import SearchField from '../../components/product/SearchField';
import { getProducts, getProductsByType } from '../../utils/data/productData';

function ProductHome() {
  const {
    productType, careLevel, lightLevel, waterNeeds, petFriendly,
  } = useContext(ProductTypeContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getAllProducts = () => {
    getProducts().then((productsArr) => {
      setProducts(productsArr);
      setFilteredProducts(productsArr);
    });
  };

  const getProductsBySelectedType = () => {
    if (!productType) {
      setFilteredProducts([]);
      setProducts([]);
      return;
    }

    const queryParams = {
      type: productType,
      careLevel,
      lightLevel,
      waterNeeds,
      petFriendly,
    };

    getProductsByType(queryParams).then((productsArr) => {
      setProducts(productsArr);
      setFilteredProducts(productsArr);
    });
  };

  useEffect(() => {
    if (productType) {
      getProductsBySelectedType();
    } else {
      getAllProducts();
    }
  }, [productType, careLevel, lightLevel, waterNeeds, petFriendly]);

  return (
    <div className="products">
      <SearchField products={products} setFilteredProducts={setFilteredProducts} />
      <div className="product-cards-container">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>

  );
}

export default ProductHome;

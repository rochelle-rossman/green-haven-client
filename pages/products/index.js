/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { ProductTypeContext } from '../../utils/context/productTypeContext';
import ProductCard from '../../components/product/ProductCard';
import SearchField from '../../components/product/SearchField';
import { getProducts, getProductsByType } from '../../utils/data/productData';

function ProductHome() {
  const { productType } = useContext(ProductTypeContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getAllProducts = () => {
    getProducts().then((productsArr) => {
      setProducts(productsArr);
      setFilteredProducts(productsArr);
    });
  };

  const getProductsBySelectedType = () => {
    getProductsByType(productType).then((productsArr) => {
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
  }, [productType]);

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

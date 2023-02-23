import { useEffect, useState } from 'react';
import UserForm from '../components/user/UserForm';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/product/ProductCard';
import SearchField from '../components/product/SearchField';
import { getProducts } from '../utils/data/productData';

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getAllProducts = () => {
    getProducts().then((productsArr) => {
      setProducts(productsArr);
      setFilteredProducts(productsArr);
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="home-container">
      {user && !user.id ? (<UserForm user={user} onUpdate={getAllProducts} />) : (
        <>
          <SearchField products={products} setFilteredProducts={setFilteredProducts} />
          <div className="product-cards-container">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

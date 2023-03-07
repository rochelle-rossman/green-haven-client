import { useEffect, useState } from 'react';
import DesignCarousel from '../components/design/DesignCarousel';
import UserForm from '../components/user/UserForm';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/product/ProductCard';
import SearchField from '../components/product/SearchField';
import { getProducts } from '../utils/data/productData';
import { getDesigns } from '../utils/data/designData';

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [isLoadingDesigns, setIsLoadingDesigns] = useState(true);

  const getAllProducts = () => {
    getProducts().then((productsArr) => {
      setProducts(productsArr);
      setFilteredProducts(productsArr);
    });
  };

  const getAllDesigns = () => {
    getDesigns().then((designsArr) => {
      setDesigns(designsArr);
      setIsLoadingDesigns(false);
    });
  };

  useEffect(() => {
    getAllProducts();
    getAllDesigns();
  }, []);

  return (
    <div className="home-container">
      {user && !user.id ? (
        <UserForm user={user} onUpdate={getAllProducts} />
      ) : (
        <>
          <SearchField products={products} setFilteredProducts={setFilteredProducts} />
          {isLoadingDesigns ? <div>Loading designs...</div> : <DesignCarousel designs={designs} />}
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

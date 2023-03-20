import { useEffect, useState } from 'react';
// import Image from 'next/image';
import DesignCarousel from '../components/design/DesignCarousel';
import UserForm from '../components/user/UserForm';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/product/ProductCard';
import SearchField from '../components/product/SearchField';
import { getProducts } from '../utils/data/productData';
import { getDesigns } from '../utils/data/designData';
import Welcome from '../components/Welcome';

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [isLoadingDesigns, setIsLoadingDesigns] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    getAllProducts();
  };

  useEffect(() => {
    getAllProducts();
    getAllDesigns();
  }, []);

  return (
    <div className="home-container">
      {user && !user.id && !formSubmitted ? (
        <UserForm user={user} onUpdate={handleFormSubmit} />
      ) : (
        <>
          <SearchField products={products} setFilteredProducts={setFilteredProducts} />
          <Welcome />
          {/* <Image src="/images/green-haven-high-resolution-logo-color-on-transparent-background (1).png" width={400} height={200} /> */}
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

import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import DesignCarousel from '../components/design/DesignCarousel';
import UserForm from '../components/user/UserForm';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../utils/data/productData';
import { getDesigns } from '../utils/data/designData';
import Welcome from '../components/Welcome';
import Loading from '../components/Loading';

function Home() {
  const { user, onUpdate, authUpdateUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [isLoadingDesigns, setIsLoadingDesigns] = useState(true);

  useEffect(() => {
    getProducts().then((productsArr) => {
      // Shuffle the products array
      const shuffledProducts = productsArr.sort(() => Math.random() - 0.5);
      // Slice the first 4 products
      const featuredProducts = shuffledProducts.slice(0, 4);
      // Set the state with the random products
      setProducts(featuredProducts);
    });
    getDesigns().then((designsArr) => {
      setDesigns(designsArr);
      setIsLoadingDesigns(false);
    });
  }, []);

  return (
    <div className="home-container">
      {user && !user.id ? (
        <UserForm user={user} onUpdate={onUpdate} authUpdateUser={authUpdateUser} />
      ) : (
        <>
          <Welcome />
          {isLoadingDesigns ? <Loading /> : <DesignCarousel designs={designs} />}
          <div className="featured-products-container">
            <Typography variant="h4">
              Featured Products
            </Typography>
            <div className="product-cards-container">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

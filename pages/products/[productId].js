import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleProduct } from '../../utils/data/productData';

export default function ProductDetailView() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    getSingleProduct(productId).then(setProduct);
  }, [router, productId]);

  return (
    <h3>{product.name}</h3>
  );
}

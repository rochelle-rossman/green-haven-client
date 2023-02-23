import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Card, CardContent, CardMedia, CardActionArea,
} from '@mui/material';
import { useRouter } from 'next/router';
import { formatCurrency } from '../../utils/utilityFunctions';

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <Card>
      <CardActionArea onClick={() => router.push(`../products/${product.id}`)}>
        <CardMedia component="img" image={product?.imageUrl} title={product.name} />
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2">
          {formatCurrency(product.price)}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    productType: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
      }),
    ),
    imageUrl: PropTypes.string,
  }).isRequired,
};

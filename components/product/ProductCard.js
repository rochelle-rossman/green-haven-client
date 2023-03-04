import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Card, CardMedia, CardActionArea, Box,
} from '@mui/material';
import { useRouter } from 'next/router';
import { formatCurrency } from '../../utils/utilityFunctions';

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => router.push(`../products/${product.id}`)}>
        <CardMedia component="img" width="100%" height="250px" image={product.imageUrl} title={product.name} />
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', flexGrow: 1, p: 2,
        }}
        >
          <Typography variant="body" gutterBottom sx={{ fontWeight: 'bold', flexWrap: 'wrap' }}>
            {product.name}
          </Typography>
          <Typography variant="body" gutterBottom sx={{ pb: '24px' }}>
            {formatCurrency(product.price)}
          </Typography>
        </Box>
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

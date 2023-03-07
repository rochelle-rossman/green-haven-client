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
    <Card sx={{ maxWidth: 345, flex: 1, minHeight: '330px' }}>
      <CardActionArea onClick={() => router.push(`../products/${product.id}`)}>
        <CardMedia component="img" width="auto" height="250px" image={product.imageUrl} title={product.name} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            flexGrow: 1,
            p: 2,
            position: 'relative',
          }}
        >
          <Typography variant="body" gutterBottom sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Typography variant="body" gutterBottom sx={{ paddingBottom: '18px' }}>
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

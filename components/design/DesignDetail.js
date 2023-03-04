import React from 'react';
import PropTypes from 'prop-types';
import { CardActionArea, Grid, Typography } from '@mui/material';
import { Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { formatCurrency } from '../../utils/utilityFunctions';

const DesignDetail = ({ design }) => {
  const {
    products, room, style, imageUrl, description,
  } = design;
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="h5">{`${room} - ${style}`}</Typography>
        <Image src={imageUrl} alt={`${room} - ${style}`} style={{ width: '100%' }} />
        <Typography variant="body">{description}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6">Products:</Typography>
        {products?.map((product) => (
          <div key={product.id}>
            <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
              <Image src={product.image_url} alt={product.name} style={{ height: '150px', marginRight: '16px' }} />
              <Typography variant="subtitle1">{`${product.name} - ${formatCurrency(product.price)}`}</Typography>
            </CardActionArea>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

DesignDetail.propTypes = {
  design: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number,
      image_url: PropTypes.string,
    })),
    room: PropTypes.string,
    style: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default DesignDetail;

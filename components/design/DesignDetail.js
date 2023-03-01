import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { Image } from 'react-bootstrap';
import { formatCurrency } from '../../utils/utilityFunctions';

const DesignDetail = ({ design }) => {
  const {
    products, room, style, imageUrl,
  } = design;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="h6">{`${room} - ${style}`}</Typography>
        <Image src={imageUrl} alt={`${room} - ${style}`} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={12} md={4}>
        {products?.map((product) => (
          <div key={product.id}>
            <Image src={product.image_url} alt={product.name} style={{ height: '150px', marginRight: '16px' }} />
            <Typography variant="subtitle1">{`${product.name} - ${formatCurrency(product.price)}`}</Typography>
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
  }).isRequired,
};

export default DesignDetail;

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Card, CardMedia, CardContent, Typography, Button, Dialog, DialogContent, DialogTitle, CardActionArea, Badge,
} from '@mui/material';
import { ShoppingCart, PetsOutlined } from '@mui/icons-material';
import { useAuth } from '../../utils/context/authContext';
import { formatCurrency } from '../../utils/utilityFunctions';
import { updateOrder, getOpenOrdersByCustomer, createOrder } from '../../utils/data/orderData';
import { CartCountContext } from '../../utils/context/cartCountContext';

function ProductDetails({ productObj }) {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { cartCount, setCartCount } = useContext(CartCountContext);

  const rootStyle = {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 988px)': {
      flexDirection: 'column',
      margin: '8px',
    },
  };

  const mediaStyle = {
    maxHeight: '600px',
    maxWidth: '600px',
  };

  const descriptionStyle = {
    marginBottom: '16px',
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isHouseplant = productObj.productType?.some((type) => type.name === 'Houseplants');
  const isHomeDecor = productObj.productType?.some((type) => type.name === 'Home/Decor');

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    getOpenOrdersByCustomer(user.id).then((openOrders) => {
      // check if open orders exist
      if (openOrders.length > 0) {
        // check if product is already in open order
        const openOrder = openOrders[0];
        const payload = { products: [], status: 'in-progress' };
        if (openOrder.products && openOrder.products.find((product) => product.id === productObj.id)) {
          // find the product in the open order
          const productInOrder = openOrder.products.find((product) => product.id === productObj.id);
          // update product quantity in order
          productInOrder.quantity += quantity;
          payload.products = openOrder.products;
        } else {
          // add product to open order
          openOrder.products = openOrder.products ? openOrder.products : [];
          openOrder.products.push({ id: productObj.id, quantity });
          payload.products = openOrder.products;
        }
        // send updated product array
        updateOrder(openOrder.id, payload).then(() => {
          router.push(`/user/shoppingCart/${user.id}`);
          setCartCount(cartCount + quantity);
        });
      } else {
        // create new order
        const newOrder = {
          products: [{ id: productObj.id, quantity }],
        };
        createOrder(newOrder, user.id).then(() => {
          router.push(`/user/shoppingCart/${user.id}`);
        });
        setCartCount(cartCount + quantity);
      }
    });
  };

  return (
    <Card key={productObj.id} sx={rootStyle}>
      <CardActionArea>
        <CardMedia sx={mediaStyle} component="img" image={productObj.imageUrl} title={productObj.name} onClick={handleOpenModal} />
      </CardActionArea>
      <CardContent>
        <Typography variant="h4" component="h1">
          {productObj.name}
        </Typography>
        <Typography variant="body1" sx={descriptionStyle}>
          {productObj.description}
        </Typography>
        {isHouseplant && (
          <div>
            <Typography variant="body2">Light Level: {productObj.lightLevel}</Typography>
            <Typography variant="body2">Water Needs: {productObj.waterNeeds}</Typography>
            <Typography variant="body2">Care Level: {productObj.careLevel}</Typography>
            {productObj.petFriendly ? <PetsOutlined /> : <Typography variant="body2">Not Safe for Pets</Typography>}
          </div>
        )}
        {isHomeDecor && <Typography variant="body2">Style: {productObj.style}</Typography>}
        <Typography variant="h6" component="h3">
          {formatCurrency(productObj.price)}
        </Typography>
        <div>
          <Button color="secondary" onClick={handleDecrement} disabled={quantity === 1}>
            -
          </Button>
          <Typography variant="body2" component="span" sx={{ margin: '0 8px' }}>
            {quantity}
          </Typography>
          <Button onClick={handleIncrement} color="secondary" disabled={!user.id || quantity >= productObj.inventory}>
            +
          </Button>
        </div>
        <Button variant="contained" color="secondary" onClick={addToCart} disabled={!user.id || productObj.inventory === 0}>
          <ShoppingCart />
          Add to Cart
        </Button>
        {productObj.inventory <= 0 && <Badge sx={{ marginLeft: '28px' }} badgeContent="Out of Stock" />}
        {!user.id ? (<Typography color="error">Please login and create an account to add items to your cart</Typography>) : ('')}
      </CardContent>
      <Dialog open={isModalOpen} onClose={handleCloseModal} sx={{ textAlign: 'center' }}>
        <DialogTitle>{productObj.name}</DialogTitle>
        <DialogContent>
          <CardMedia component="img" src={productObj.imageUrl} alt={productObj.name} sx={{ width: '150%' }} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

ProductDetails.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    inventory: PropTypes.number,
    description: PropTypes.string,
    productType: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    lightLevel: PropTypes.string,
    waterNeeds: PropTypes.string,
    careLevel: PropTypes.string,
    petFriendly: PropTypes.bool,
    style: PropTypes.string,
  }).isRequired,
};

export default ProductDetails;

/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table, TableBody, TableCell, TableRow, TableHead, Button, Select, FormControl, MenuItem, CardActionArea, CardMedia, Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { updateOrder } from '../../utils/data/orderData';
import { formatCurrency } from '../../utils/utilityFunctions';
import { getCustomersPaymentMethods } from '../../utils/data/paymentMethodData';
import { useAuth } from '../../utils/context/authContext';
import { CartCountContext } from '../../utils/context/cartCountContext';

export default function ShoppingCart({
  productOrderObj, handleDecrement, handleIncrement, handleDelete,
}) {
  const total = productOrderObj && productOrderObj.length > 0 ? productOrderObj.reduce((acc, productOrder) => acc + productOrder.product.price * productOrder.quantity, 0) : 0;
  const [payments, setPayments] = useState([]);
  const { user } = useAuth();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
  const router = useRouter();
  const { setCartCount } = useContext(CartCountContext);

  useEffect(() => {
    getCustomersPaymentMethods(user.id).then((response) => setPayments(response));
  }, [user]);

  const handleCheckOut = () => {
    productOrderObj.forEach((order) => {
      updateOrder(order.order.id, {
        status: 'completed',
        paymentMethod: selectedPaymentMethod.id,
        products: [
          {
            id: order.product.id,
            quantity: order.quantity,
          },
        ],
      }).then(() => router.push('/'));
    });
    setCartCount(0);
  };

  return (
    <div className="shopping-cart">
      {productOrderObj.length ? (
        <>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <b>Product</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Price</b>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {productOrderObj.map(({ product, quantity }) => (
                  <TableRow key={product.id}>
                    <TableCell align="center">
                      <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
                        <Typography align="left" style={{ margin: '10px' }}>
                          {product.name}
                        </Typography>
                        <CardMedia component="img" style={{ height: 100, width: 100, backgroundSize: 'contain' }} image={product.image_url} title={product.name} />
                      </CardActionArea>
                    </TableCell>
                    <TableCell align="right">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button color="secondary" onClick={() => handleDecrement(product.id)}>
                          -
                        </Button>
                        {quantity}
                        <Button color="secondary" onClick={() => handleIncrement(product.id)} disabled={quantity >= product.inventory}>
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(product.price)} {quantity > 1 ? 'each' : ''}
                    </TableCell>
                    <TableCell align="center">
                      <Button color="warning" size="small" fontSize="small" onClick={() => handleDelete(product.id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TableCell align="center">
              <div style={{ justifyContent: 'flex-end' }}>
                <b>Total:</b> {formatCurrency(total)}
              </div>
              <div style={{ justifyContent: 'flex-end', margin: '15px' }}>
                <FormControl fullWidth required>
                  <Select value={selectedPaymentMethod.id || ''} onChange={(e) => setSelectedPaymentMethod(payments.find((payment) => payment.id === e.target.value))}>
                    {payments.map((payment) => (
                      <MenuItem key={payment.id} value={payment.id}>
                        {payment.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ justifyContent: 'flex-end' }}>
                <Button disabled={!selectedPaymentMethod.id} variant="outlined" color="secondary" onClick={() => handleCheckOut()}>
                  Check Out
                </Button>
              </div>
            </TableCell>
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '10px',
            flexWrap: 'wrap',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <h2>NO ITEMS HAVE BEEN ADDED TO YOUR CART</h2>
          <Button variant="outlined" color="success" onClick={() => router.push('/')}>
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}

ShoppingCart.propTypes = {
  productOrderObj: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        inventory: PropTypes.number,
        imageUrl: PropTypes.string,
      }),
      quantity: PropTypes.number,
    }),
  ).isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

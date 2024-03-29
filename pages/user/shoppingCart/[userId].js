import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import ShoppingCart from '../../../components/order/ShoppingCart';
import { deleteProductOrder, getOpenProductOrderByCustomer, updateProductOrder } from '../../../utils/data/orderData';
import { CartCountContext } from '../../../utils/context/cartCountContext';

export default function ShoppingCartView() {
  const router = useRouter();
  const { userId } = router.query;
  const [openOrder, setOpenOrder] = useState([]);
  const { cartCount, setCartCount } = useContext(CartCountContext);

  useEffect(() => {
    getOpenProductOrderByCustomer(userId).then(setOpenOrder);
  }, [userId]);

  const handleDecrement = (productId) => {
    const productOrderToUpdate = openOrder.find((productOrder) => productOrder.product.id === productId);
    if (productOrderToUpdate.quantity > 1) {
      const updatedProductOrders = openOrder.map((productOrder) => {
        if (productOrder.product.id === productId) {
          return { ...productOrder, quantity: productOrder.quantity - 1 };
        }
        return productOrder;
      });
      setOpenOrder(updatedProductOrders);
      updateProductOrder(productOrderToUpdate.id, {
        product: productOrderToUpdate.product.id,
        order: productOrderToUpdate.order.id,
        quantity: productOrderToUpdate.quantity - 1,
      }).then(() => setOpenOrder(updatedProductOrders));
      setCartCount(cartCount - 1);
    } else {
      deleteProductOrder(productOrderToUpdate.id).then(() => {
        setOpenOrder(openOrder.filter((productOrder) => productOrder.id !== productOrderToUpdate.id));
      });
      setCartCount(cartCount - 1);
    }
  };

  const handleIncrement = (productId) => {
    const updatedProductOrders = openOrder.map((productOrder) => {
      if (productOrder.product.id === productId) {
        return { ...productOrder, quantity: productOrder.quantity + 1 };
      }
      return productOrder;
    });
    setOpenOrder(updatedProductOrders);
    const productOrderToUpdate = updatedProductOrders.find((productOrder) => productOrder.product.id === productId);
    updateProductOrder(productOrderToUpdate.id, {
      product: productOrderToUpdate.product.id,
      order: productOrderToUpdate.order.id,
      quantity: productOrderToUpdate.quantity,
    }).then(() => setOpenOrder(updatedProductOrders));
    setCartCount(cartCount + 1);
  };

  const handleDelete = (productId) => {
    const productOrderToUpdate = openOrder.find((productOrder) => productOrder.product.id === productId);
    if (productOrderToUpdate) {
      deleteProductOrder(productOrderToUpdate.id).then(() => {
        setOpenOrder(openOrder.filter((productOrder) => productOrder.id !== productOrderToUpdate.id));
        setCartCount(cartCount - productOrderToUpdate.quantity);
      });
    }
  };

  return (
    <>
      <ShoppingCart productOrderObj={openOrder} handleDecrement={handleDecrement} handleIncrement={handleIncrement} handleDelete={handleDelete} />
    </>
  );
}

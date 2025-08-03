import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from '../feature/cart/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addProductToCart = (producto, quantity = 1) => {
    dispatch(addToCart({ producto, quantity }));
  };

  const removeProductFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const updateProductQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const incrementProductQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const decrementProductQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const clearAllCart = () => {
    dispatch(clearCart());
  };

  const isProductInCart = (productId) => {
    return cart.items.some(item => item.id === productId);
  };

  const getProductQuantityInCart = (productId) => {
    const item = cart.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return {
    // Estado del carrito
    items: cart.items,
    total: cart.total,
    subtotal: cart.subtotal,
    totalDiscount: cart.totalDiscount,
    itemCount: cart.itemCount,

    // Funciones
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    incrementProductQuantity,
    decrementProductQuantity,
    clearAllCart,
    isProductInCart,
    getProductQuantityInCart,
  };
};
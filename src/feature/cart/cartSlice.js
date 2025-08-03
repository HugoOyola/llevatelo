import { createSlice } from '@reduxjs/toolkit';
import { calcularPrecioFinal } from '../../utils/precio';

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  subtotal: 0,
  totalDiscount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { producto, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === producto.id);

      if (existingItem) {
        // Si ya existe, aumentar cantidad (respetando el stock)
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          producto.stock
        );
        existingItem.quantity = newQuantity;
      } else {
        // Agregar nuevo item
        const precioFinal = parseFloat(calcularPrecioFinal(producto.price, producto.discount));
        state.items.push({
          id: producto.id,
          title: producto.title,
          price: producto.price,
          discount: producto.discount || 0,
          finalPrice: precioFinal,
          quantity: Math.min(quantity, producto.stock),
          stock: producto.stock,
          mainImage: producto.mainImage,
          brand: producto.brand,
        });
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      cartSlice.caseReducers.calculateTotals(state);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);

      if (item && quantity > 0 && quantity <= item.stock) {
        item.quantity = quantity;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);

      if (item && item.quantity < item.stock) {
        item.quantity += 1;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      state.subtotal = 0;
      state.totalDiscount = 0;
    },

    calculateTotals: (state) => {
      let subtotal = 0;
      let totalDiscount = 0;
      let itemCount = 0;

      state.items.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        const itemTotal = item.finalPrice * item.quantity;
        const itemDiscount = itemSubtotal - itemTotal;

        subtotal += itemSubtotal;
        totalDiscount += itemDiscount;
        itemCount += item.quantity;
      });

      state.subtotal = parseFloat(subtotal.toFixed(2));
      state.totalDiscount = parseFloat(totalDiscount.toFixed(2));
      state.total = parseFloat((subtotal - totalDiscount).toFixed(2));
      state.itemCount = itemCount;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const calculateTotals = (cart) => {
  if (!cart || !Array.isArray(cart)) return { totalQuantity: 0, totalAmount: 0 };
  const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalAmount = cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
  return { totalQuantity, totalAmount };
};

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.cart) {
        state.cart = [];
      }
      
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.cart.push(newItem);
      }
      
      const { totalQuantity, totalAmount } = calculateTotals(state.cart);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
    removeItem: (state, action) => {
      if (!state.cart) {
        state.cart = [];
        return;
      }

      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        if (state.cart[itemIndex].quantity > 1) {
          state.cart[itemIndex].quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        }
        const { totalQuantity, totalAmount } = calculateTotals(state.cart);
        state.totalQuantity = totalQuantity;
        state.totalAmount = totalAmount;
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    deleteItem: (state, action) => {
      if (!state.cart) {
        state.cart = [];
        return;
      }

      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      const { totalQuantity, totalAmount } = calculateTotals(state.cart);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
  },
});

export const { addItem, removeItem, clearCart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;


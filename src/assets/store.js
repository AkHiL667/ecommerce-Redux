import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
  stateReconciler: (inboundState, originalState) => {
    // Ensure cart state is properly initialized
    if (inboundState.cart) {
      return {
        ...inboundState,
        cart: {
          ...inboundState.cart,
          cart: inboundState.cart.cart || [],
          totalQuantity: inboundState.cart.totalQuantity || 0,
          totalAmount: inboundState.cart.totalAmount || 0,
        }
      };
    }
    return inboundState;
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

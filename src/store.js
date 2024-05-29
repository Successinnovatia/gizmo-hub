import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import productsReducer from "./features/products/productsSlice";
export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    productsState: productsReducer,
  },
});

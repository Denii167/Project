// bazarSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { prodList } from "../Data";

const initialState = {
  productData: [],
  userInfo: null,
};

export const bazarSlice = createSlice({
  name: "bazar",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = prodList.find((item) => item._id === action.payload._id);

      if (newItem) {
        const existingItem = state.productData.find(
          (item) => item._id === newItem._id
        );

        if (existingItem) {
          existingItem.quantity += action.payload.quantity || 1;
        } else {
          state.productData.push({
            ...newItem,
            quantity: action.payload.quantity || 1,
          });
        }
      }
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    increamentQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    updateUser: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increamentQuantity,
  decrementQuantity,
  addUser,
  removeUser,
  updateUser,
} = bazarSlice.actions;
export default bazarSlice.reducer;

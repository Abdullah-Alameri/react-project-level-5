import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: JSON.parse(localStorage.getItem("selectedProducts")) ? JSON.parse(localStorage.getItem("selectedProducts")): [],
  selectedProductsID: JSON.parse(localStorage.getItem("selectedProductsID")) ? JSON.parse(localStorage.getItem("selectedProductsID")): [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // state.value += action.payload
      const productWithQuantity = { ...action.payload, quantity: 1 };
      state.selectedProducts.push(productWithQuantity);
      state.selectedProductsID.push(action.payload.id);

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },
    increaseQuantity: (state, action) => {
      // state.value += action.payload
      const incresdedProduct = state.selectedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      incresdedProduct.quantity += 1;

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
    decreaseQuantity: (state, action) => {
      // state.value += action.payload
      const incresdedProduct = state.selectedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      incresdedProduct.quantity -= 1;
      if (incresdedProduct.quantity === 0) {
        const newArr = state.selectedProducts.filter((item) => {
          return item.id !== action.payload.id;
        });

        const newArr2 = state.selectedProductsID.filter((item) => {
          return item !== action.payload.id;
        });

        state.selectedProducts = newArr;
        state.selectedProductsID = newArr2;

        localStorage.setItem(
          "selectedProductsID",
          JSON.stringify(state.selectedProductsID)
        );
      }

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
    deleteProduct: (state, action) => {
      // state.value += action.payload
      const newArr = state.selectedProducts.filter((item) => {
        return item.id !== action.payload.id;
      });

      const newArr2 = state.selectedProductsID.filter((item) => {
        return item !== action.payload.id;
      });
      state.selectedProducts = newArr;
      state.selectedProductsID = newArr2;

      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } =
  counterSlice.actions;

export default counterSlice.reducer;

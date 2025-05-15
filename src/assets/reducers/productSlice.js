import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
})

const initialState = {
    products: [],
    isLoading: false,
    error: null,
};

const productSlice = createSlice({  
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = null;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.products = [];
          });
    }
});

export default productSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "https://fakestoreapi.com";

export const getDatas = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${URL}/products`);
    return response.data;
})

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
    filterValue: ""
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setInputValue: (state, action) => {
            state.filterValue = action.payload;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDatas.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDatas.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            });
    }
});


export const { setInputValue, setSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;

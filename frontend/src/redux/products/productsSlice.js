import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './thunk';

const initialState = {
    item: [],
    loading: false,
    error: null
}

const productsSlice = createSlice ({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.item.push(action.payload)
        },
        updateProduct: (state, action) => {
            const index = state.item.findIndex(p => p.id === action.payload.id); 
            if (index !== -1) {
                state.item[index] = action.payload; 
            }
        },
        deleteProduct: (state, action) => {
        state.item = state.item.filter(p => p.id !== action.payload); 
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.item = action.payload 
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'ошибка при загрузке продуктов'
            })
    }
})

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
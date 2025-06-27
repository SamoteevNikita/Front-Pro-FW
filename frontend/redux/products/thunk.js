import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',             
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      return response.data;             
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

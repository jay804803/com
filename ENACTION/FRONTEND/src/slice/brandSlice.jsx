
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

const GET_BRAND = "http://localhost:3000/brand/getAllBrand";
const CREATE_BRAND = "http://localhost:3000/brand/create";
const UPDATE_BRAND = "http://localhost:3000/brand/updateBrand/"
const DELETE_BRAND = "http://localhost:3000/brand/deleteBrand/"


export const getAllBrands = createAsyncThunk('brand/getAllBrand', async (_, thunkAPI) => {
  try {
    const response = await axios.get(GET_BRAND);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch brands');
  }
});

export const addBrand = createAsyncThunk('brand/addBrand', async (brandData, thunkAPI) => {
  try {
    const response = await axios.post(CREATE_BRAND, brandData);
    console.log( "RESPONSE..." , response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add brand');
  }
});


export const updateBrand = createAsyncThunk('brand/updateBrand', async ( {id, name} , thunkAPI) => {
  try {
    console.log(">>" , name);
    const response = await axios.put(UPDATE_BRAND + id , {name});
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update brand');
  }
});


export const deleteBrand = createAsyncThunk('brand/deleteBrand', async (id, thunkAPI) => {
  try {
    const response =await axios.delete(DELETE_BRAND + id);
    console.log( "IN" , response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete brand');
  }
});

const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands  = action.payload.brands.map(({ _id, name }) => ({ id: _id, name }));
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push( { name : action.payload.brand.name , id:action.payload.brand._id});
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        console.log( "<<<<<<<<<<<<<<" , action.payload)
        const index = state.brands.findIndex((brand) => brand.id === action.payload.brand._id);
        if (index !== -1) {
          state.brands[index].name = action.payload.brand.name;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter((brand) => brand.id !== action.payload.brand._id);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brandSlice.reducer;

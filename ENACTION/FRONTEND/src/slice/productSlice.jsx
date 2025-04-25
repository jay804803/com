import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const CREATE_PRODUCT = 'http://localhost:3000/product/createProduct';
const GET_PRODUCT = 'http://localhost:3000/product/getAllProduct';
const DELETE_PRODUCT = 'http://localhost:3000/product/deleteProduct';
const UPDATE_PRODUCT = 'http://localhost:3000/product/updateProduct';


export const getAllProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(GET_PRODUCT);
      console.log("LLLLLLLLLLLLL" , response.data.products)
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(CREATE_PRODUCT, productData);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${UPDATE_PRODUCT}/${productId}`, updateData);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${DELETE_PRODUCT}/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  products: [],
  loading: false,
  error: null,
};


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        
        state.products = action.payload.map((product)=>({
            _id:product._id,
            description:product.description,
            image:product.image,
            price:product.price,
            oldPrice:product.oldPrice,
            discount:product.discount,
            gender:product.gender,
            occasion:product.occasion,
            color:product.color,
            category:product.category,
            brand:product.brand,
            name:product.name
        }))
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        const newProduct = {
          _id: action.payload._id,
          name: action.payload.name,
          subcategories: action.payload.subcategories || [],
        };
        state.products.push(newProduct);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = {
            _id: action.payload._id,
            name: action.payload.name,
            subcategories: action.payload.subcategories || [],
          };
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

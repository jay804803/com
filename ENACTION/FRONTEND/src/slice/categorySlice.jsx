import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CREATE_CATEGORY = "http://localhost:3000/categorys/create";
const GET_CATEGORY = "http://localhost:3000/categorys/getAllCategory";
const DELETE_CATEGORY = "http://localhost:3000/categorys/";
const UPDATE_CATEGORY = "http://localhost:3000/categorys/"

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(GET_CATEGORY);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);


export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ name }, thunkAPI) => {
    try {
      const response = await axios.post(CREATE_CATEGORY, { name });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add category"
      );
    }
  }
);


export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(`${UPDATE_CATEGORY}${id}`, { name });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);


export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${DELETE_CATEGORY}${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);


const initialState = {
  categories: [],
  loading: false,
  error: null,
};


const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories.map((category) => ({
          _id: category._id,
          name: category.name,
        }));
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
       
        state.categories.push({_id:action.payload.category._id , name:action.payload.category.name  });
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (category) => category._id === action.payload.category._id
        );
        if (index !== -1) {
          state.categories[index].name = action.payload.category.name;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
  },
});

export default categorySlice.reducer;

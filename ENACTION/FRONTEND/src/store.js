import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./slice/brandSlice.jsx";
import categoryReducer from "./slice/categorySlice.jsx";
import productReducer from "./slice/productSlice.jsx"
const store = configureStore({
    reducer:{
       brand:brandReducer,
       category :categoryReducer,
       product:productReducer
    }
})

export default store;
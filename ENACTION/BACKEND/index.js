import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import categoryRoute from "./routes/category.route.js"
import BrandRoute from "./routes/brand.route.js"
import ProductRoute from "./routes/product.route.js"
const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.use("/categorys" , categoryRoute );

app.use("/brand" , BrandRoute);

app.use("/product" , ProductRoute);

app.use('/uploads', express.static('uploads'));

connectDB();

const port = process.env.PORT || 4000;

app.listen(port , ()=>{
    console.log("server start at port :" , port);
})
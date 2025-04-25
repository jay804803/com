// routes/brandRoutes.js

import express from 'express';
import { createBrand, deleteBrand, getAllBrands, updateBrand } from '../controller/brand.controller.js';


const router = express.Router();

router.post('/create', createBrand);

router.get('/getAllBrand', getAllBrands);

router.put('/updateBrand/:brandId', updateBrand);

router.delete('/deleteBrand/:brandId', deleteBrand);

export default router;

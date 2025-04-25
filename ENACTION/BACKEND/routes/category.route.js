import express from 'express';
import {  createCategory, deleteCategory, getAllCategories, updateCategory } from '../controller/category.controller.js';

const router = express.Router();

router.post('/create', createCategory);
router.get('/getAllCategory', getAllCategories);
router.delete('/:categoryId', deleteCategory);
router.put('/:categoryId' , updateCategory);
export default router;

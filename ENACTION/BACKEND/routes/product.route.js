import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controller/product.controller.js';
import multer from 'multer';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },  
  fileFilter: (req, file, cb) => {
    
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

const router = express.Router();

router.post('/createProduct', upload.single('image'), createProduct);
router.get('/getAllProduct', getAllProducts);
router.get('/getProduct/:productId', getProductById);
router.put('/updateProduct/:productId', upload.single('image'), updateProduct);
router.delete('/deleteProduct/:productId', deleteProduct);

export default router;

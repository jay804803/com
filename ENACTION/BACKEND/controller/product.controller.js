import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      oldPrice,
      discount,
      gender,
      occasion,
      colors,
      categoryId,
      brandId,
    } = req.body;

    // Handle the uploaded image
    const image = req.file ? req.file.path : '';  // Get the path of the uploaded image

    // Validate category and brand existence
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const brand = await Brand.findById(brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    // Ensure color is an array
    const colorArray = Array.isArray(colors) ? colors : [colors];

    const newProduct = new Product({
      name,
      description,
      image,  // Store the image path
      price,
      oldPrice,
      discount,
      gender,
      occasion,
      color: colorArray,
      category: categoryId,
      brand: brandId,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('brand', 'name');
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId)
      .populate('category', 'name')
      .populate('brand', 'name');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

   
    if (req.file) {
      updateData.image = req.file.path;  
    }

    if (updateData.categoryId) {
      const category = await Category.findById(updateData.categoryId);
      if (!category) return res.status(404).json({ error: 'Category not found' });
      updateData.category = updateData.categoryId;
    }

    if (updateData.brandId) {
      const brand = await Brand.findById(updateData.brandId);
      if (!brand) return res.status(404).json({ error: 'Brand not found' });
      updateData.brand = updateData.brandId;
    }

    
    if (updateData.color) {
      updateData.color = Array.isArray(updateData.color) ? updateData.color : [updateData.color];
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

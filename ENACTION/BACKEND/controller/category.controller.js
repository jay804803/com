import Category from "../models/category.model.js";





  export const createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  export const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const deleteCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;

      console.log( "backenc", categoryId);
  
      const category = await Category.findByIdAndDelete(categoryId);
      if (!category) return res.status(404).json({ error: 'Category not found' });
  
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const updateCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;

      const {name} = req.body;

      console.log( "backenc", categoryId);
  
      const category = await Category.findByIdAndUpdate(categoryId , {name} , { new: true } );
      if (!category) return res.status(404).json({ error: 'Category not found' });
  
      res.status(200).json({ message: 'Category update successfully' , category });
    } catch (error) {
      console.error('Error update category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


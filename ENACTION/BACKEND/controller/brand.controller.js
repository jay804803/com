import Brand from "../models/brand.model.js";

export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ error: 'Brand already exists' });
    }
    const newBrand = new Brand({ name });
    await newBrand.save();
    res.status(201).json({ message: 'Brand created successfully', brand: newBrand });
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ brands });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const { name } = req.body;
    const updatedBrand = await Brand.findByIdAndUpdate(
      brandId,
      { name },
      { new: true, runValidators: true }
    );
    if (!updatedBrand) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    res.status(200).json({ message: 'Brand updated successfully', brand: updatedBrand });
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteBrand = async (req, res) => {
  try {
    const {brandId} = req.params;
    
    const deletedBrand = await Brand.findByIdAndDelete({_id:brandId});
    if (!deletedBrand) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    res.status(200).json({ message: 'Brand deleted successfully' , "brand" : deletedBrand });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

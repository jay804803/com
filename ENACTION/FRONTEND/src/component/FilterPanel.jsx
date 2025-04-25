// src/components/FilterPanel.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const FilterPanel = ({ onFilter }) => {
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);

  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    gender: '',
    occasion: '',
    priceRange: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  return (
    <div className="p-6 bg-white rounded-lg border-2 border-gray-300 shadow-md max-full overflow-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Filter Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Brand</label>
          <select
            name="brand"
            value={filters.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

       
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

      
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Gender</label>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Genders</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Boy">Boy</option>
            <option value="Girl">Girl</option>
          </select>
        </div>

     
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Occasion</label>
          <select
            name="occasion"
            value={filters.occasion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Occasions</option>
            <option value="party">Party</option>
            <option value="Casual">Casual</option>
            <option value="Sport">Sport</option>
          </select>
        </div>

      
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Price Range</label>
          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Prices</option>
            <option value="0-999">Under ₹1,000</option>
            <option value="1000-4999">₹1,000 - ₹4,999</option>
            <option value="5000-9999">₹5,000 - ₹9,999</option>
            <option value="10000-19999">₹10,000 - ₹19,999</option>
            <option value="20000-999999">₹20,000 and above</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

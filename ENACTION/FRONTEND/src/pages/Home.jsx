// src/pages/Home.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../slice/productSlice';
import { getAllCategories } from '../slice/categorySlice';
import { getAllBrands } from '../slice/brandSlice';
import TableWithPagination from '../component/TableWithPagination';
import FilterPanel from '../component/FilterPanel';

const Home = () => {

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilter = useCallback((filters) => {
    let filtered = products;

    if (filters.brand) {
      filtered = filtered.filter((product) => product.brand.name === filters.brand);
    }

    if (filters.category) {
      filtered = filtered.filter((product) => product.category.name === filters.category);
    }

    if (filters.gender) {
      filtered = filtered.filter((product) => product.gender === filters.gender);
    }

    if (filters.occasion) {
      filtered = filtered.filter((product) => product.occasion === filters.occasion);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
    }

    setFilteredProducts(filtered);
  }, [products]);

  return (
    <div className="pt-24 h-screen px-12">
      <div className="h-[33%] bg-white w-full rounded-2xl">
        <FilterPanel onFilter={handleFilter} />
      </div>

      <div className="h-[62%] w-full bg-white rounded-2xl mt-3 overflow-auto">
        <TableWithPagination products={filteredProducts} />
      </div>
    </div>
  );
};

export default Home;

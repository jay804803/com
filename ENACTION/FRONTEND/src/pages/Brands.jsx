import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBrand,
  getAllBrands,
  deleteBrand,
  updateBrand,
} from '../slice/brandSlice.jsx';
import toast from 'react-hot-toast';

const Brand = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);

  const [brandName, setBrandName] = useState('');
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editingBrandName, setEditingBrandName] = useState('');
  const [deleteBrandId, setDeleteBrandId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (brandName.trim() === '') return;

    dispatch(addBrand({ name: brandName })).then((result) => {
      if (result.type === 'brand/addBrand/fulfilled') {
        toast.success('Brand deleted', {
          duration: 3000, 
          position: 'top-right', 
        });
        setBrandName('');
      }else if(result.type === ""){
        toast.error('Error ', {
          duration: 3000, 
          position: 'top-right',
        });
      }
    });
  };

  const handleDeleteBrand = (id) => {
    setDeleteBrandId(id);
    setIsModalOpen(true);
  };

  const confirmDeleteBrand = () => {
    dispatch(deleteBrand(deleteBrandId)).then((result) => {
      if(result.type === "brand/deleteBrand/fulfilled"){
        toast.success('Brand deleted', {
          duration: 3000, 
          position: 'top-right', 
        });
      }else if(result.type === "brand/deleteBrand/rejected"){
        toast.error('Error ', {
          duration: 3000, 
          position: 'top-right', 
        });
      }
      setIsModalOpen(false);
    });
  };

  const handleEditBrand = (brand) => {
    setEditingBrandId(brand.id);
    setEditingBrandName(brand.name);
  };

  const handleUpdateBrand = (e) => {
    e.preventDefault();
    if (editingBrandName.trim() === '') return;

    dispatch(updateBrand({ id: editingBrandId, name: editingBrandName })).then(
      (result) => {
        console.log(result)
        if(result.type === "brand/updateBrand/fulfilled"){
          toast.success('Brand updated', {
            duration: 3000,
            position: 'top-right', 
          });

        }else if(result.type === "brand/updateBrand/rejected"){
          toast.error('Error ', {
            duration: 3000, 
            position: 'top-right', 
          });
        }
      }
    );
    setEditingBrandId(null);
    setEditingBrandName('');
  };

  return (
    <div className="mx-auto px-12 pt-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div className="bg-white p-6 rounded-lg shadow-md h-[200px] border-2 border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Add Brand</h2>
          <form onSubmit={handleAddBrand}>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Brand Name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
            >
              Add Brand
            </button>
          </form>
        </div>

        
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Brand Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="w-full bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300 hover:shadow-2xl transition duration-300"
              >
                {editingBrandId === brand.id ? (
                  <form onSubmit={handleUpdateBrand}>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                      value={editingBrandName}
                      onChange={(e) => setEditingBrandName(e.target.value)}
                      required
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200"
                        onClick={() => setEditingBrandId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="text-lg font-medium mb-2">{brand.name}</h3>
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 border border-blue-600 px-4 py-2 rounded-md"
                        onClick={() => handleEditBrand(brand)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 border border-red-600 px-4 py-2 rounded-md"
                        onClick={() => handleDeleteBrand(brand.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {brands.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No brands added yet.
              </div>
            )}
          </div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this brand?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                onClick={confirmDeleteBrand}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brand;
